const navigations = [
  { icon: 'home', nav: 'Dashboard' },
  { icon: 'sync_alt', nav: 'Transactions' },
  { icon: 'radar', nav: 'Budgets' },
  { icon: 'trophy', nav: 'Goals' },
  { icon: 'bar_chart', nav: 'Reports' },
  { icon: 'settings', nav: 'Settings' },
]

const Sidebar = ({ activeNav, onNavigate, isOpen, onClose }) => (
  <aside className={`fixed left-0 top-0 z-1000 flex min-h-screen w-58 shrink-0 flex-col gap-0.5 overflow-y-auto transition-transform md:translate-x-0 duration-300 ${isOpen ? "translate-x-0":"-translate-x-full"} border-x border-x-[#1e133a] bg-[#150d29] p-3 text-[16px]`}>

    <button onClick={onClose} className="flex justify-end md:hidden">
      <span className="material-symbols-outlined p-1 rounded-full">chevron_right</span>
    </button>
    <div className="flex items-center justify-start gap-4 md:py-4 md:pb-8 pb-4">
      <img
        src="https://cdn-icons-png.flaticon.com/128/7276/7276473.png"
        alt="Expense Tracker logo"
        height="60"
        width="60"
      />
      <div className="flex flex-col text-2xl font-bold">
        <span>Expense</span>
        <span className="text-purple-800">Tracker</span>
      </div>
    </div>

    <nav aria-label="Main navigation" className="flex flex-col gap-1">
      {navigations.map((item) => (
        <button
          key={item.nav}
          type="button"
          aria-current={activeNav === item.nav ? 'page' : undefined}
          onClick={() => onNavigate(item.nav)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-1 text-left text-sm transition ${activeNav === item.nav
            ? 'border border-violet-700 bg-violet-800/80'
            : 'hover:bg-violet-900/40'
            }`}
        >
          <span className="material-symbols-outlined p-2">{item.icon}</span>
          <span>{item.nav}</span>
        </button>
      ))}
    </nav>

    <button type="button" className="mt-auto flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-violet-900/40">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500 font-semibold">DV</div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Dhanraj Verma</p>
        <p className="text-xs text-gray-400">Premium User 👑</p>
      </div>
      <span className="material-symbols-outlined ml-auto">more_vert</span>
    </button>
  </aside>
)

export default Sidebar
