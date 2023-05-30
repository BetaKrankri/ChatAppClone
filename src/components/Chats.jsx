const Chats = () => {
  return (
    <div className="chats w-full pt-2">
      <div className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          <img className="w-full h-full object-contain rounded-md overflow-hidden" />
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <h1 className="font-bold text-xl">Juan Perez</h1>
          <p className="line-clamp-1 text-sm">
            Éste es mi ultimo mensaje de Juan Perez. Y no volvere a escribir
            mas.
          </p>
        </div>
        <div>
          <span>13:45</span>
        </div>
      </div>

      <div className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          <img className="w-full h-full object-contain rounded-md overflow-hidden" />
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <h1 className="font-bold text-xl">Alvina Peregrina</h1>
          <p className="line-clamp-1 text-sm">
            Alvina la marina por taurina me la arrima
          </p>
        </div>
        <div>
          <span>12:10</span>
        </div>
      </div>

      <div className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          <img className="w-full h-full object-contain rounded-md overflow-hidden" />
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <h1 className="font-bold text-xl">Alvina Peregrina</h1>
          <p className="line-clamp-1 text-sm">
            Alvina la marina por taurina me la arrima
          </p>
        </div>
        <div>
          <span>12:10</span>
        </div>
      </div>
    </div>
  );
};

export default Chats;
