import Image from "next/image";
import Link from "next/link";

export function Logo({ name = "Eustache" }: { name?: string }) {
  return (
    <Link
    
      href="/"
      aria-label={`${name} – home`}
      className="group flex items-center font-display text-xl font-extrabold"
      
    >
      <Image
  src="/logo.png"
  alt=""
  width={64}
  height={64}
  priority
  className="size-16 object-contain transition duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:size-20"
/>
      <span className="-ml-4 hidden sm:inline">{name}</span>
    </Link>
  );
}