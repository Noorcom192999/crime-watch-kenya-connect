
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Police Stations table
CREATE TABLE police_stations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    county VARCHAR(100) NOT NULL,
    sub_county VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Officers table with proper Kenya Police Service ranks
CREATE TABLE officers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_number VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rank VARCHAR(50) NOT NULL CHECK (rank IN (
        'Constable',
        'Corporal', 
        'Sergeant',
        'Senior Sergeant',
        'Inspector',
        'Chief Inspector',
        'Assistant Superintendent',
        'Superintendent',
        'Senior Superintendent',
        'Commissioner of Police',
        'Assistant Inspector-General',
        'Senior Assistant Inspector-General',
        'Deputy Inspector-General',
        'Inspector-General of Police'
    )),
    station_id UUID REFERENCES police_stations(id),
    phone VARCHAR(20),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ... keep existing code (Crime Reports table and other tables) the same ...

-- Crime Reports table (for community reports)
CREATE TABLE crime_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    report_id VARCHAR(50) UNIQUE NOT NULL, -- CR/2024/001 format
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('incident', 'tip')),
    incident_type VARCHAR(100) NOT NULL,
    urgency_level VARCHAR(20) NOT NULL CHECK (urgency_level IN ('emergency', 'urgent', 'routine')),
    description TEXT NOT NULL,
    location_address TEXT NOT NULL,
    location_latitude DECIMAL(10, 8),
    location_longitude DECIMAL(11, 8),
    incident_date DATE,
    incident_time TIME,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'under_investigation', 'resolved', 'closed')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    is_anonymous BOOLEAN DEFAULT false,
    reporter_name VARCHAR(255),
    reporter_contact VARCHAR(255),
    assigned_station_id UUID REFERENCES police_stations(id),
    assigned_officer_id UUID REFERENCES officers(id),
    evidence_description TEXT,
    witnesses_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Occurrence Book entries table
CREATE TABLE occurrence_book_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ob_number VARCHAR(50) UNIQUE NOT NULL, -- OB/001/2024 format
    station_id UUID NOT NULL REFERENCES police_stations(id),
    incident_type VARCHAR(100) NOT NULL,
    priority_level VARCHAR(20) NOT NULL CHECK (priority_level IN ('low', 'medium', 'high')),
    location TEXT NOT NULL,
    incident_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    complainant_name VARCHAR(255),
    complainant_contact VARCHAR(255),
    description TEXT NOT NULL,
    evidence_collected TEXT,
    witnesses_info TEXT,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'under_investigation', 'resolved', 'closed')),
    investigating_officer_id UUID REFERENCES officers(id),
    created_by_officer_id UUID NOT NULL REFERENCES officers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report Status History table (for tracking status changes)
CREATE TABLE report_status_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    report_id UUID REFERENCES crime_reports(id),
    ob_entry_id UUID REFERENCES occurrence_book_entries(id),
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by_officer_id UUID REFERENCES officers(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crime Statistics table (for crime clock analytics)
CREATE TABLE crime_statistics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    station_id UUID NOT NULL REFERENCES police_stations(id),
    county VARCHAR(100) NOT NULL,
    crime_type VARCHAR(100) NOT NULL,
    incident_count INTEGER NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case Files table (for evidence management)
CREATE TABLE case_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    case_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    lead_officer VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Evidence Items table (for crime register)
CREATE TABLE evidence_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    evidence_id VARCHAR(50) UNIQUE NOT NULL,
    case_id VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    collected_by VARCHAR(255) NOT NULL,
    date_collected DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Secured' CHECK (status IN ('Secured', 'Under Analysis', 'Released', 'Destroyed')),
    blockchain_hash VARCHAR(255),
    integrity_status VARCHAR(50) DEFAULT 'Verified' CHECK (integrity_status IN ('Verified', 'Compromised', 'Under Review')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ... keep existing code (indexes and functions) the same ...

-- Indexes for better performance
CREATE INDEX idx_crime_reports_status ON crime_reports(status);
CREATE INDEX idx_crime_reports_station ON crime_reports(assigned_station_id);
CREATE INDEX idx_crime_reports_created_at ON crime_reports(created_at);
CREATE INDEX idx_crime_reports_incident_type ON crime_reports(incident_type);

CREATE INDEX idx_ob_entries_station ON occurrence_book_entries(station_id);
CREATE INDEX idx_ob_entries_status ON occurrence_book_entries(status);
CREATE INDEX idx_ob_entries_created_at ON occurrence_book_entries(created_at);

CREATE INDEX idx_officers_station ON officers(station_id);
CREATE INDEX idx_officers_service_number ON officers(service_number);
CREATE INDEX idx_officers_rank ON officers(rank);

CREATE INDEX idx_stations_county ON police_stations(county);

CREATE INDEX idx_evidence_case_id ON evidence_items(case_id);
CREATE INDEX idx_evidence_status ON evidence_items(status);

-- Insert some sample police stations
INSERT INTO police_stations (name, address, county, sub_county, phone, email, latitude, longitude) VALUES
('Central Police Station', 'Uhuru Highway, Nairobi CBD', 'Nairobi', 'Starehe', '+254-20-2222222', 'central@police.go.ke', -1.2864, 36.8172),
('Westlands Police Station', 'Westlands Road, Westlands', 'Nairobi', 'Westlands', '+254-20-3333333', 'westlands@police.go.ke', -1.2676, 36.8098),
('Karen Police Station', 'Karen Road, Karen', 'Nairobi', 'Langata', '+254-20-4444444', 'karen@police.go.ke', -1.3197, 36.7073),
('Kilimani Police Station', 'Argwings Kodhek Road, Kilimani', 'Nairobi', 'Dagoretti North', '+254-20-5555555', 'kilimani@police.go.ke', -1.2962, 36.7828),
('Kasarani Police Station', 'Thika Road, Kasarani', 'Nairobi', 'Kasarani', '+254-20-6666666', 'kasarani@police.go.ke', -1.2258, 36.8906);

-- Insert sample officers with proper Kenya Police Service ranks
INSERT INTO officers (service_number, first_name, last_name, rank, station_id, phone, email) VALUES
('PC001234', 'John', 'Mwangi', 'Constable', (SELECT id FROM police_stations WHERE name = 'Westlands Police Station'), '+254-700-111111', 'j.mwangi@police.go.ke'),
('SGT002345', 'Mary', 'Wanjiku', 'Sergeant', (SELECT id FROM police_stations WHERE name = 'Central Police Station'), '+254-700-222222', 'm.wanjiku@police.go.ke'),
('PC003456', 'David', 'Kipchoge', 'Constable', (SELECT id FROM police_stations WHERE name = 'Karen Police Station'), '+254-700-333333', 'd.kipchoge@police.go.ke'),
('INSP004567', 'Grace', 'Akinyi', 'Inspector', (SELECT id FROM police_stations WHERE name = 'Kilimani Police Station'), '+254-700-444444', 'g.akinyi@police.go.ke'),
('CPL005678', 'Peter', 'Mutua', 'Corporal', (SELECT id FROM police_stations WHERE name = 'Kasarani Police Station'), '+254-700-555555', 'p.mutua@police.go.ke'),
('SSGT006789', 'Rose', 'Cherono', 'Senior Sergeant', (SELECT id FROM police_stations WHERE name = 'Central Police Station'), '+254-700-666666', 'r.cherono@police.go.ke'),
('CI007890', 'James', 'Ochieng', 'Chief Inspector', (SELECT id FROM police_stations WHERE name = 'Westlands Police Station'), '+254-700-777777', 'j.ochieng@police.go.ke'),
('ASP008901', 'Lucy', 'Kamau', 'Assistant Superintendent', (SELECT id FROM police_stations WHERE name = 'Karen Police Station'), '+254-700-888888', 'l.kamau@police.go.ke');

-- ... keep existing code (functions, RLS policies, and sample data) the same ...

-- Function to generate report IDs
CREATE OR REPLACE FUNCTION generate_report_id()
RETURNS TEXT AS $$
DECLARE
    next_number INTEGER;
    report_id TEXT;
BEGIN
    -- Get the next number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(report_id FROM 'CR/\d{4}/(\d{3})') AS INTEGER)), 0) + 1
    INTO next_number
    FROM crime_reports
    WHERE report_id LIKE 'CR/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/%';
    
    -- Format the report ID
    report_id := 'CR/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN report_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate OB numbers
CREATE OR REPLACE FUNCTION generate_ob_number(station_id_param UUID)
RETURNS TEXT AS $$
DECLARE
    next_number INTEGER;
    ob_number TEXT;
    station_name TEXT;
BEGIN
    -- Get station name for OB number
    SELECT UPPER(LEFT(name, 3)) INTO station_name
    FROM police_stations
    WHERE id = station_id_param;
    
    -- Get the next number for this year and station
    SELECT COALESCE(MAX(CAST(SUBSTRING(ob_number FROM '\d{3}/\d{4}/(\d{3})') AS INTEGER)), 0) + 1
    INTO next_number
    FROM occurrence_book_entries
    WHERE station_id = station_id_param
    AND ob_number LIKE '%/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/%';
    
    -- Format the OB number: STA/001/2024/001
    ob_number := station_name || '/' || LPAD(next_number::TEXT, 3, '0') || '/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/' || LPAD(next_number::TEXT, 3, '0');
    
    RETURN ob_number;
END;
$$ LANGUAGE plpgsql;

-- Function to generate evidence IDs
CREATE OR REPLACE FUNCTION generate_evidence_id()
RETURNS TEXT AS $$
DECLARE
    next_number INTEGER;
    evidence_id TEXT;
BEGIN
    -- Get the next number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(evidence_id FROM 'EV/\d{4}/(\d{4})') AS INTEGER)), 0) + 1
    INTO next_number
    FROM evidence_items
    WHERE evidence_id LIKE 'EV/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/%';
    
    -- Format the evidence ID
    evidence_id := 'EV/' || EXTRACT(YEAR FROM CURRENT_DATE) || '/' || LPAD(next_number::TEXT, 4, '0');
    
    RETURN evidence_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE crime_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE occurrence_book_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE police_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE crime_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can modify these based on your authentication needs)

-- Allow public to insert crime reports (community reporting)
CREATE POLICY "Anyone can submit crime reports" ON crime_reports
    FOR INSERT WITH CHECK (true);

-- Allow public to read non-sensitive crime report data
CREATE POLICY "Public can read basic crime report info" ON crime_reports
    FOR SELECT USING (true);

-- Allow public to read police stations info
CREATE POLICY "Public can read police stations" ON police_stations
    FOR SELECT USING (true);

-- More restrictive policies for OB entries (only authenticated officers)
CREATE POLICY "Officers can manage OB entries" ON occurrence_book_entries
    FOR ALL USING (true); -- You'll want to restrict this based on officer authentication

-- Officers can read their own and station data
CREATE POLICY "Officers can read officer data" ON officers
    FOR SELECT USING (true);

-- Evidence and case file policies
CREATE POLICY "Officers can manage evidence" ON evidence_items
    FOR ALL USING (true);

CREATE POLICY "Officers can manage case files" ON case_files
    FOR ALL USING (true);

-- Sample crime reports for testing
INSERT INTO crime_reports (report_id, report_type, incident_type, urgency_level, description, location_address, incident_date, incident_time, status, priority, is_anonymous, assigned_station_id) VALUES
('CR/2024/001', 'incident', 'theft', 'urgent', 'Mobile phone stolen at bus stop', 'Westlands Shopping Centre, Nairobi', '2024-01-15', '14:30:00', 'under_investigation', 'medium', false, (SELECT id FROM police_stations WHERE name = 'Westlands Police Station')),
('CR/2024/002', 'tip', 'suspicious-activity', 'routine', 'Suspicious individuals loitering around ATM', 'KCB Bank, Karen Road', '2024-01-16', '09:15:00', 'assigned', 'low', true, (SELECT id FROM police_stations WHERE name = 'Karen Police Station')),
('CR/2024/003', 'incident', 'assault', 'emergency', 'Physical altercation reported', 'CBD, Tom Mboya Street', '2024-01-16', '16:45:00', 'resolved', 'high', false, (SELECT id FROM police_stations WHERE name = 'Central Police Station'));

-- Sample case files
INSERT INTO case_files (case_id, title, lead_officer, status, priority) VALUES
('CASE-2024-001', 'Westlands Theft Investigation', 'Insp. Grace Akinyi', 'active', 'medium'),
('CASE-2024-002', 'CBD Assault Case', 'Sgt. Mary Wanjiku', 'active', 'high'),
('CASE-2024-003', 'Karen Fraud Investigation', 'PC David Kipchoge', 'closed', 'low');

-- Sample evidence items
INSERT INTO evidence_items (evidence_id, case_id, type, description, location, collected_by, date_collected, status, integrity_status) VALUES
('EV/2024/0001', 'CASE-2024-001', 'Physical', 'Stolen mobile phone Samsung Galaxy', 'Evidence Locker A-1', 'PC John Mwangi', '2024-01-15', 'Secured', 'Verified'),
('EV/2024/0002', 'CASE-2024-002', 'Digital', 'CCTV footage from Tom Mboya Street', 'Digital Storage Unit B', 'Sgt. Mary Wanjiku', '2024-01-16', 'Under Analysis', 'Verified'),
('EV/2024/0003', 'CASE-2024-003', 'Document', 'Fraudulent bank statements', 'Evidence Locker C-5', 'PC David Kipchoge', '2024-01-10', 'Secured', 'Verified');

