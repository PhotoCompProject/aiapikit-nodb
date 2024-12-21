-- Create the database
CREATE DATABASE IF NOT EXISTS ai_api_kit;
USE ai_api_kit;

-- API Providers table
CREATE TABLE api_providers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    category ENUM('text-generation', 'image-generation', 'speech-to-text') NOT NULL,
    description TEXT NOT NULL,
    pricing ENUM('pay-per-use', 'subscription') NOT NULL,
    documentation VARCHAR(255) NOT NULL,
    base_price DECIMAL(10, 6) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Features table (many-to-one relationship with api_providers)
CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_id VARCHAR(36) NOT NULL,
    feature VARCHAR(255) NOT NULL,
    FOREIGN KEY (api_id) REFERENCES api_providers(id) ON DELETE CASCADE
);

-- Sliders table (many-to-one relationship with api_providers)
CREATE TABLE sliders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('tokens', 'images', 'minutes') NOT NULL,
    default_value INT NOT NULL,
    step INT NOT NULL,
    min_value INT NOT NULL,
    max_value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (api_id) REFERENCES api_providers(id) ON DELETE CASCADE
);

-- Outputs table (many-to-one relationship with api_providers)
CREATE TABLE outputs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    calculation_formula TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (api_id) REFERENCES api_providers(id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_api_providers_category ON api_providers(category);
CREATE INDEX idx_api_providers_ pricing ON api_providers(pricing);
CREATE INDEX idx_features_api_id ON features(api_id);
CREATE INDEX idx_sliders_api_id ON sliders(api_id);
CREATE INDEX idx_outputs_api_id ON outputs(api_id);