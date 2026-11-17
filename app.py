from pathlib import Path
import sqlite3
from flask import Flask, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
DATABASE = Path(__file__).resolve().parent / "ganaderia.db"

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")

def conectar_db():
    conexion = sqlite3.connect(DATABASE)
    conexion.row_factory = sqlite3.Row
    return conexion

def inicializar_db():
    with conectar_db() as conexion:
        conexion.execute("""
            CREATE TABLE IF NOT EXISTS bovinos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                identificacion TEXT NOT NULL UNIQUE,
                peso REAL NOT NULL,
                color TEXT NOT NULL,
                sexo TEXT NOT NULL,
                edad REAL NOT NULL,
                raza TEXT NOT NULL,
                salud TEXT NOT NULL,
                alimentacion TEXT NOT NULL,
                medicamentos TEXT DEFAULT ''
            )
        """)

def bovino_a_dict(fila):
    return dict(fila)

@app.get("/")
def inicio():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.get("/api/bovinos")
def listar_bovinos():
    with conectar_db() as conexion:
        filas = conexion.execute(
            "SELECT * FROM bovinos ORDER BY id DESC"
        ).fetchall()
    return jsonify([bovino_a_dict(fila) for fila in filas])

@app.post("/api/bovinos")
def crear_bovino():
    datos = request.get_json(silent=True) or {}
    campos = ["identificacion", "peso", "color", "sexo", "edad",
              "raza", "salud", "alimentacion", "medicamentos"]

    faltantes = [campo for campo in campos[:-1] if datos.get(campo) is None or str(datos.get(campo)).strip() == ""]
    if faltantes:
        return jsonify({"error": "Faltan campos obligatorios: " + ", ".join(faltantes)}), 400

    try:
        peso = float(datos["peso"])
        edad = float(datos["edad"])
        if peso < 0 or edad < 0:
            return jsonify({"error": "El peso y la edad no pueden ser negativos."}), 400
    except (TypeError, ValueError):
        return jsonify({"error": "El peso y la edad deben ser valores numéricos."}), 400

    try:
        with conectar_db() as conexion:
            cursor = conexion.execute("""
                INSERT INTO bovinos
                (identificacion, peso, color, sexo, edad, raza, salud, alimentacion, medicamentos)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                str(datos["identificacion"]).strip(), peso,
                str(datos["color"]).strip(), str(datos["sexo"]).strip(), edad,
                str(datos["raza"]).strip(), str(datos["salud"]).strip(),
                str(datos["alimentacion"]).strip(), str(datos.get("medicamentos") or "").strip()
            ))
            nuevo_id = cursor.lastrowid
            fila = conexion.execute("SELECT * FROM bovinos WHERE id = ?", (nuevo_id,)).fetchone()
        return jsonify(bovino_a_dict(fila)), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Ya existe un bovino con esa identificación."}), 409

@app.put("/api/bovinos/<int:bovino_id>")
def actualizar_bovino(bovino_id):
    datos = request.get_json(silent=True) or {}
    campos = ["identificacion", "peso", "color", "sexo", "edad", "raza", "salud", "alimentacion"]
    faltantes = [campo for campo in campos if datos.get(campo) is None or str(datos.get(campo)).strip() == ""]
    if faltantes:
        return jsonify({"error": "Faltan campos obligatorios: " + ", ".join(faltantes)}), 400
    try:
        peso = float(datos["peso"])
        edad = float(datos["edad"])
        if peso < 0 or edad < 0:
            return jsonify({"error": "El peso y la edad no pueden ser negativos."}), 400
    except (TypeError, ValueError):
        return jsonify({"error": "El peso y la edad deben ser valores numéricos."}), 400

    try:
        with conectar_db() as conexion:
            existe = conexion.execute("SELECT id FROM bovinos WHERE id = ?", (bovino_id,)).fetchone()
            if not existe:
                return jsonify({"error": "Bovino no encontrado."}), 404
            conexion.execute("""
                UPDATE bovinos SET
                identificacion = ?, peso = ?, color = ?, sexo = ?, edad = ?,
                raza = ?, salud = ?, alimentacion = ?, medicamentos = ?
                WHERE id = ?
            """, (
                str(datos["identificacion"]).strip(), peso, str(datos["color"]).strip(),
                str(datos["sexo"]).strip(), edad, str(datos["raza"]).strip(),
                str(datos["salud"]).strip(), str(datos["alimentacion"]).strip(),
                str(datos.get("medicamentos") or "").strip(), bovino_id
            ))
            fila = conexion.execute("SELECT * FROM bovinos WHERE id = ?", (bovino_id,)).fetchone()
        return jsonify(bovino_a_dict(fila))
    except sqlite3.IntegrityError:
        return jsonify({"error": "Ya existe otro bovino con esa identificación."}), 409

@app.delete("/api/bovinos/<int:bovino_id>")
def eliminar_bovino(bovino_id):
    with conectar_db() as conexion:
        cursor = conexion.execute("DELETE FROM bovinos WHERE id = ?", (bovino_id,))
        if cursor.rowcount == 0:
            return jsonify({"error": "Bovino no encontrado."}), 404
    return jsonify({"mensaje": "Bovino eliminado correctamente."})

if __name__ == "__main__":
    inicializar_db()
    app.run(debug=True)
