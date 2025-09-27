import { CreditCard, Download, Store, Workflow } from "lucide-react";

const Stats8 = ({

  stats = [
    {
      id: "stat-2",
      icon: Store,
      value: "8 عدد",
      label: "فرآیندهای در بازارچه",
    },
    {
      id: "stat-1",
      icon: Workflow,
      value: "6 عدد",
      label: "همه فرآیندها",
    },
    {
      id: "stat-2",
      icon: Download,
      value: "16 عدد",
      label: "دانلودها",
    },
    {
      id: "stat-2",
      icon: CreditCard,
      value: "250,000 تومان",
      label: "مجموع درآمد",
    }
  ]
}) => {
  return (
    <section>
      <div className="mt-5 grid gap-x-5 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col text-lg space-y-4 rounded-lg border border-slate-200 transition-shad{children}ow hover:shadow-sm text-base  px-3 py-4 justify-between items-center mb-5">
            <div className="text-indigo-500 bg-indigo-100 p-3 rounded-full ">
              <stat.icon size={"32"} />
            </div>
            <span className=" text-gray-700 text-sm md:text-xl">{stat.label}</span>
            <div className=" text-gray-400">{stat.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Stats8 };
