CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  test_name TEXT NOT NULL,
  test_mode TEXT NOT NULL,
  page_path TEXT NOT NULL,
  origin TEXT,
  username TEXT NOT NULL,
  email TEXT,
  comment TEXT,
  client_ip_hash TEXT,
  user_agent TEXT,
  result_count INTEGER NOT NULL DEFAULT 0,
  payload_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_test_mode ON submissions(test_mode);
CREATE INDEX IF NOT EXISTS idx_submissions_username ON submissions(username);
