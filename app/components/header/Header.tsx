import Link from "next/link";
import Input from "src/components/input/Input";

export default function Header() {
  return (
    <header>
      <nav className="border-gray-200 border-b-2 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Weather app</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
