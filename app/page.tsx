import Link from "next/link"

export default function Home() {

  const pages = [

    {

      title: "Dashboard",

      path: "/dashboard"

    },

    {

      title: "Deposit",

      path: "/deposit"

    },

    {

      title: "Transaction History",

      path: "/history"

    },

    {

      title: "Analytics",

      path: "/analytics"

    },

    {

      title: "Pepper AI",

      path: "/ai"

    }

  ]

  return (

    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold mb-10">

        Pepper Wallet

      </h1>

      <div className="grid gap-6">

        {pages.map((page) => (

          <Link

            key={page.path}

            href={page.path}

          >

            <div className="bg-zinc-900 p-6 rounded-2xl hover:bg-zinc-800 transition cursor-pointer">

              <h2 className="text-2xl font-bold">

                {page.title}

              </h2>

            </div>

          </Link>

        ))}

      </div>

    </main>

  )

}
