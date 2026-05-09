function Footer() {
  return (
    <footer className="w-full mt-auto py-12 px-12 flex flex-col items-center gap-6 bg-primary-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-headline italic text-lg text-on-primary">
          Université des Sciences
        </span>
        <p className="text-xs font-light max-w-lg text-on-primary-container/90">
          © 2026 Université Cadi Ayyad. All Rights Reserved. Institution d'Excellence depuis 1975.
        </p>
      </div>
    </footer>
  )
}

export default Footer