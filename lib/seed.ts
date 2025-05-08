import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      image VARCHAR(255),
      role VARCHAR(20),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  const createBusinessProfile = await sql`
    CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(20),
    google_maps_link VARCHAR(500),
    facebook_link VARCHAR(255),
    instagram_link VARCHAR(255),
    linkedin_link VARCHAR(255),
    other_social_link VARCHAR(255),
    logo_url VARCHAR(255),
    business_hours TEXT,
    has_discount BOOLEAN DEFAULT FALSE,
    discount_details TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    submitted_by VARCHAR(255),
    tags TEXT[]
);
`;

  console.log(`Created "profiles" table`);

  const profiles = await Promise.all([
    sql`
          INSERT INTO profiles (name, email, image, role)
          VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg', 'admin')
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO profiles (name, email, image, role)
          VALUES ('Lee Robinson', 'lee@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg', 'user')
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO profiles (name, email, image, role)
          VALUES ('Steven Tey', 'stey@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg', 'admin')
          ON CONFLICT (email) DO NOTHING;
      `,
  ]);

  const businesses = await Promise.all([
    sql`INSERT INTO businesses (
  business_name, owner_name, description, category,
  phone, email, website, address, city, state, zip,
  google_maps_link, facebook_link, instagram_link,
  linkedin_link, other_social_link, logo_url, business_hours,
  has_discount, discount_details, is_verified, is_featured,
  submitted_by, tags
) VALUES 
-- 1
(
  'Graceful Cuts Salon', 'Ashley Roberts', 'Faith-based hair salon offering cuts, color, and styling.',
  'Salon', '720-555-1234', 'ashley@gracefulcuts.com', 'https://gracefulcuts.com',
  '123 Elm Street', 'Denver', 'CO', '80203', 
  'https://maps.google.com/?q=123+Elm+Street+Denver+CO+80203',
  'https://facebook.com/gracefulcuts', 'https://instagram.com/gracefulcuts',
  NULL, NULL, 'https://example.com/images/salon-logo.png',
  'Mon-Fri: 9am-6pm; Sat: 10am-4pm',
  TRUE, '10% off for church members', TRUE, TRUE,
  'ashleyR', ARRAY['hair', 'salon', 'faith-based', 'discount']
),
-- 2
(
  'Heavenly Plumbing Co.', 'David Nguyen', 'Reliable plumbing services for homes and churches.',
  'Plumbing', '303-555-7890', 'david@heavenlyplumbing.com', 'https://heavenlyplumbing.com',
  '456 Oak Avenue', 'Aurora', 'CO', '80012',
  'https://maps.google.com/?q=456+Oak+Avenue+Aurora+CO+80012',
  'https://facebook.com/heavenlyplumbing', NULL,
  'https://linkedin.com/in/davidnguyen', NULL,
  'https://example.com/images/plumbing-logo.png',
  'Mon-Fri: 8am-5pm; Emergency 24/7',
  FALSE, NULL, TRUE, FALSE,
  'davidN', ARRAY['plumbing', 'emergency', 'home services']
),
-- 3
(
  'Faith & Finance Consulting', 'Tanya Brooks', 'Helping Christian families steward their finances.',
  'Financial Services', '720-333-0000', 'tanya@faithfinance.com', 'https://faithfinance.com',
  '789 Maple Drive', 'Littleton', 'CO', '80120',
  NULL, NULL, NULL, NULL, NULL,
  'https://example.com/images/finance-logo.png',
  'By appointment only',
  TRUE, 'Free 30-minute consultation for church members', TRUE, FALSE,
  'tanyaB', ARRAY['finance', 'consulting', 'christian']
),
-- 4
(
  'Bread of Life Bakery', 'Monique Adams', 'Freshly baked bread and pastries with a mission.',
  'Bakery', '303-222-4567', 'monique@breadoflife.com', 'https://breadoflife.com',
  '321 Cherry Lane', 'Denver', 'CO', '80204',
  NULL, 'https://facebook.com/breadoflifebakery', 'https://instagram.com/breadoflife',
  NULL, NULL, 'https://example.com/images/bakery-logo.png',
  'Tue-Sat: 7am-3pm',
  TRUE, 'Buy one, get one free for first-time visitors', TRUE, TRUE,
  'moniqueA', ARRAY['bakery', 'pastries', 'faith-based']
),
-- 5
(
  'Kingdom Auto Repair', 'James Cole', 'Honest, affordable auto repairs by a Christian mechanic.',
  'Auto Repair', '720-999-8888', 'james@kingdomauto.com', 'https://kingdomauto.com',
  '654 Broadway Blvd', 'Englewood', 'CO', '80113',
  'https://maps.google.com/?q=654+Broadway+Blvd+Englewood+CO+80113',
  NULL, NULL, NULL, NULL,
  'https://example.com/images/auto-logo.png',
  'Mon-Fri: 8am-6pm',
  FALSE, NULL, TRUE, FALSE,
  'jamesC', ARRAY['auto', 'repair', 'trusted', 'mechanic']
),
-- 6
(
  'Holy Grounds Coffee', 'Rachel Smith', 'Cozy coffee shop with a peaceful, faith-filled atmosphere.',
  'Coffee Shop', '720-111-2222', 'rachel@holygrounds.com', 'https://holygrounds.com',
  '888 Grace St', 'Lakewood', 'CO', '80226',
  NULL, 'https://facebook.com/holygroundscoffee', 'https://instagram.com/holygrounds',
  NULL, NULL, 'https://example.com/images/coffee-logo.png',
  'Mon-Sun: 7am-9pm',
  TRUE, 'Free small coffee with church bulletin', TRUE, TRUE,
  'rachelS', ARRAY['coffee', 'cafe', 'christian', 'community']
),
-- 7
(
  'New Light Counseling', 'Dr. Eric Greene', 'Faith-based mental health services for individuals and families.',
  'Counseling', '720-777-3333', 'eric@newlightcounseling.com', 'https://newlightcounseling.com',
  '232 Hope Ave', 'Boulder', 'CO', '80301',
  NULL, NULL, NULL, NULL, NULL,
  'https://example.com/images/counseling-logo.png',
  'By appointment only',
  FALSE, NULL, TRUE, FALSE,
  'ericG', ARRAY['counseling', 'mental health', 'faith-based']
),
-- 8
(
  'Agape Landscaping', 'Luis Martinez', 'Beautiful landscaping done with love and excellence.',
  'Landscaping', '303-123-4567', 'luis@agapelandscaping.com', 'https://agapelandscaping.com',
  '101 Greenway Rd', 'Thornton', 'CO', '80229',
  NULL, NULL, NULL, NULL, NULL,
  'https://example.com/images/landscape-logo.png',
  'Mon-Sat: 7am-7pm',
  FALSE, NULL, TRUE, FALSE,
  'luisM', ARRAY['landscaping', 'yard', 'outdoor', 'design']
),
-- 9
(
  'Covenant Tech Solutions', 'Nina Patel', 'IT support and website services for churches and nonprofits.',
  'Technology', '720-444-1212', 'nina@covenanttech.com', 'https://covenanttech.com',
  '909 Digital Pkwy', 'Broomfield', 'CO', '80020',
  NULL, 'https://facebook.com/covenanttech', NULL,
  'https://linkedin.com/in/ninapatel', NULL,
  'https://example.com/images/tech-logo.png',
  'Mon-Fri: 9am-5pm',
  TRUE, '10% off for nonprofit organizations', TRUE, TRUE,
  'ninaP', ARRAY['technology', 'web', 'support', 'nonprofit']
),
-- 10
(
  'Light House Media', 'Carl Johnson', 'Christian video production and storytelling services.',
  'Media', '720-555-9191', 'carl@lighthousemedia.com', 'https://lighthousemedia.com',
  '777 Vision Blvd', 'Parker', 'CO', '80134',
  NULL, 'https://facebook.com/lighthousemedia', NULL,
  NULL, NULL, 'https://example.com/images/media-logo.png',
  'By appointment only',
  FALSE, NULL, TRUE, FALSE,
  'carlJ', ARRAY['media', 'video', 'storytelling', 'christian']
);

`,
  ]);
  console.log(`Seeded ${profiles.length} profiles`);

  return {
    businesses,
    createTable,
    createBusinessProfile,
    profiles,
  };
}
