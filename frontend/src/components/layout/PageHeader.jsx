const PageHeader = ({ title, subTitle, actions, children }) => (
  <>
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-[var(--ring)] mt-1">{subTitle}</p>
      </div>
      <div className="flex items-center space-x-3">{actions}</div>
    </div>

    <main className="bg-gray-50">{children}</main>
  </>
);

export default PageHeader;
