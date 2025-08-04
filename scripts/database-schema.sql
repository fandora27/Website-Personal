-- Database Schema untuk Sistem Prediksi Kelahiran Bayi
-- Menggunakan SQLite untuk kemudahan deployment

-- Tabel untuk menyimpan data ibu hamil
CREATE TABLE IF NOT EXISTS ibu_hamil (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_ibu VARCHAR(100) NOT NULL,
    usia INTEGER NOT NULL,
    tekanan_darah ENUM('rendah', 'normal', 'tinggi') NOT NULL,
    tfu ENUM('sesuai', 'tidak_sesuai') NOT NULL,
    letak_janin ENUM('sesuai', 'tidak_sesuai') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan hasil prediksi
CREATE TABLE IF NOT EXISTS prediksi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ibu_hamil_id INTEGER,
    prediksi ENUM('Normal', 'Berisiko') NOT NULL,
    probabilitas_normal DECIMAL(5,4) NOT NULL,
    probabilitas_berisiko DECIMAL(5,4) NOT NULL,
    confidence DECIMAL(5,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ibu_hamil_id) REFERENCES ibu_hamil(id)
);

-- Tabel untuk menyimpan data training
CREATE TABLE IF NOT EXISTS data_training (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_ibu VARCHAR(100) NOT NULL,
    usia INTEGER NOT NULL,
    tekanan_darah ENUM('rendah', 'normal', 'tinggi') NOT NULL,
    tfu ENUM('sesuai', 'tidak_sesuai') NOT NULL,
    letak_janin ENUM('sesuai', 'tidak_sesuai') NOT NULL,
    label ENUM('Normal', 'Berisiko') NOT NULL,
    is_training BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan metrik model
CREATE TABLE IF NOT EXISTS model_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accuracy DECIMAL(5,2) NOT NULL,
    precision_val DECIMAL(5,2) NOT NULL,
    recall_val DECIMAL(5,2) NOT NULL,
    auc DECIMAL(5,3) NOT NULL,
    training_data_count INTEGER NOT NULL,
    testing_data_count INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk user management
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    full_name VARCHAR(100),
    email VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- Insert default users
INSERT OR IGNORE INTO users (username, password_hash, role, full_name) VALUES 
('admin', 'admin123', 'admin', 'Administrator'),
('user', 'user123', 'user', 'User Demo');

-- Insert sample training data berdasarkan jurnal
INSERT OR IGNORE INTO data_training (nama_ibu, usia, tekanan_darah, tfu, letak_janin, label) VALUES
('Ibu A', 25, 'normal', 'sesuai', 'sesuai', 'Normal'),
('Ibu B', 30, 'normal', 'sesuai', 'sesuai', 'Normal'),
('Ibu C', 35, 'tinggi', 'tidak_sesuai', 'tidak_sesuai', 'Berisiko'),
('Ibu D', 22, 'normal', 'sesuai', 'sesuai', 'Normal'),
('Ibu E', 40, 'tinggi', 'tidak_sesuai', 'tidak_sesuai', 'Berisiko'),
('Ibu F', 28, 'normal', 'sesuai', 'sesuai', 'Normal'),
('Ibu G', 33, 'rendah', 'tidak_sesuai', 'tidak_sesuai', 'Berisiko'),
('Ibu H', 26, 'normal', 'sesuai', 'sesuai', 'Normal'),
('Ibu I', 38, 'tinggi', 'tidak_sesuai', 'tidak_sesuai', 'Berisiko'),
('Ibu J', 24, 'normal', 'sesuai', 'sesuai', 'Normal');

-- Insert model metrics berdasarkan hasil jurnal
INSERT OR IGNORE INTO model_metrics (accuracy, precision_val, recall_val, auc, training_data_count, testing_data_count) VALUES
(92.73, 83.33, 100.00, 0.991, 110, 55);

-- Index untuk optimasi query
CREATE INDEX IF NOT EXISTS idx_prediksi_created_at ON prediksi(created_at);
CREATE INDEX IF NOT EXISTS idx_ibu_hamil_created_at ON ibu_hamil(created_at);
CREATE INDEX IF NOT EXISTS idx_data_training_label ON data_training(label);
