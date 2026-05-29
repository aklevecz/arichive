-- Knowledge-base entries. thinkers/concepts are stored as JSON-array strings.
CREATE TABLE IF NOT EXISTS entries (
	id              TEXT PRIMARY KEY,
	created_at      TEXT NOT NULL,
	suggested_title TEXT,
	highlight       TEXT NOT NULL,
	explanation     TEXT NOT NULL,
	connection      TEXT,
	source_title  TEXT,
	source_url    TEXT,
	context       TEXT,
	thinkers      TEXT,
	concepts      TEXT
);

CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries (created_at DESC);
