"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

export default function BottomNav() {

  const pathname = usePathname()

  const tabs = [

    {

      name: "Home",

      path: "/"

    },

    {

      name: "Dashboard",

      path: "/dashboard"

    },

    {

      name: "History",

      path: "/history"

    },

    {

      name: "Analytics",

      path: "/analytics"

    },

    {

      name: "AI",

      path: "/ai"

    }

  ]

  return (

    <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800">

      <div className="grid grid-cols-5">

        {tabs.map((tab) => (

          <Link

            key={tab.path}

            href={tab.path}

            className={`

              p-4 text-center text-sm font-bold

              ${pathname === tab.path

                ? "text-green-400"

                : "text-zinc-500"}

            `}

          >

            {tab.name}

          </Link>

        ))}

      </div>

    </div>

  )

}
