export default function Home() {
  return (
    <section className="p-5">
      <article>
        <p className="text-2xl font-bold">인기 순위</p>
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 1</p>
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 2</p>
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
    </section>
  );
}
