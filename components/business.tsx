import postgres from "postgres";
import BusinessDirectory from "./BusinessDirectory";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function BusinessDirectoryPage() {
  let data;

  try {
    data = await sql`
    SELECT * FROM businesses WHERE status = 'pending' ORDER BY "createdAt" DESC;
  `;
  } catch (error) {
    throw error;
  }

  return <BusinessDirectory businesses={data} />;
}
