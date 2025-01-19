import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Go back to <Link href="/home">home</Link>
      </p>
    </div>
  );
}
