import Link from "next/link";

export default function SidebarTab({title, Icon}){
    return(
        <Link href={`/${title}`} legacyBehavior>
            <a className="text-white font-bold ">
                <span className="flex flex-row gap-4 lg:text-md text-sm pr-4 ml-4 mt-4 hover:opacity-80 transition duration-75 p-2.5 rounded-md">
                {Icon}
                {title}
                </span>
            </a>
        </Link>
    )
}