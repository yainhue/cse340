--- Create "organizations" table

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

--- Insert sample data into "organizations"

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

--- Create "service_project" table

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organizations(organization_id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL
);

--- Insert sample data into "service_project"

INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Park Renovation', 'Renovating the local community park with sustainable materials.', 'Downtown District', '2026-06-15'),
(1, 'Bridge Repair Initiative', 'Repairing old bridges to improve safety and accessibility.', 'Riverfront Area', '2026-07-02'),
(1, 'School Playground Upgrade', 'Installing eco-friendly playground equipment for children.', 'Westside Elementary', '2026-08-10'),
(1, 'Solar Street Lighting', 'Adding solar-powered lights to reduce energy costs.', 'Central Avenue', '2026-09-05'),
(1, 'Community Center Expansion', 'Expanding the local center to host more events.', 'Eastside Community Center', '2026-10-12'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Urban Farming Workshop', 'Educational workshop on sustainable urban farming practices.', 'Greenhouse Center', '2026-06-20'),
(2, 'Community Compost Program', 'Launching a compost initiative to reduce waste.', 'Neighborhood Garden', '2026-07-15'),
(2, 'Hydroponics Training', 'Teaching hydroponic farming techniques to volunteers.', 'Training Hall', '2026-08-22'),
(2, 'Farm-to-Table Fair', 'Organizing a fair to promote local produce.', 'City Plaza', '2026-09-18'),
(2, 'Vertical Garden Project', 'Building vertical gardens in urban spaces.', 'Metro Station Walls', '2026-10-25'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Volunteer Food Drive', 'Coordinating volunteers to collect and distribute food to shelters.', 'City Hall Plaza', '2026-06-30'),
(3, 'Charity Marathon', 'Organizing a marathon to raise funds for local charities.', 'Main Boulevard', '2026-07-28'),
(3, 'Clothing Donation Campaign', 'Collecting clothes for families in need.', 'Community Warehouse', '2026-08-12'),
(3, 'Senior Care Visits', 'Volunteers visiting senior citizens to provide support.', 'Sunrise Retirement Home', '2026-09-08'),
(3, 'Holiday Gift Program', 'Distributing gifts to children during the holidays.', 'Central Library', '2026-12-20');

--- Create "categories" TABLE

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

--- Create "project_category" TABLE

CREATE TABLE project_category (
    project_id INT NOT NULL REFERENCES service_project(project_id),
    category_id INT NOT NULL REFERENCES category(category_id),
    PRIMARY KEY (project_id, category_id)
);

--- Insert categories

INSERT INTO category (name)
VALUES
('Education'),
('Health'),
('Infrastructure'),
('Environment');

--- Link each service project with a category

-- BrightFuture Builders projects (IDs 1–5)
INSERT INTO project_category (project_id, category_id) VALUES (1, 3); -- Infrastructure
INSERT INTO project_category (project_id, category_id) VALUES (2, 3); -- Infrastructure
INSERT INTO project_category (project_id, category_id) VALUES (3, 1); -- Education
INSERT INTO project_category (project_id, category_id) VALUES (4, 4); -- Environment
INSERT INTO project_category (project_id, category_id) VALUES (5, 3); -- Infrastructure

-- GreenHarvest Growers projects (IDs 6–10)
INSERT INTO project_category (project_id, category_id) VALUES (6, 1); -- Education
INSERT INTO project_category (project_id, category_id) VALUES (7, 4); -- Environment
INSERT INTO project_category (project_id, category_id) VALUES (8, 1); -- Education
INSERT INTO project_category (project_id, category_id) VALUES (9, 2); -- Health
INSERT INTO project_category (project_id, category_id) VALUES (10, 4); -- Environment

-- UnityServe Volunteers projects (IDs 11–15)
INSERT INTO project_category (project_id, category_id) VALUES (11, 2); -- Health
INSERT INTO project_category (project_id, category_id) VALUES (12, 2); -- Health
INSERT INTO project_category (project_id, category_id) VALUES (13, 2); -- Health
INSERT INTO project_category (project_id, category_id) VALUES (14, 1); -- Education
INSERT INTO project_category (project_id, category_id) VALUES (15, 4); -- Environment



