import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CardTwo= () => {
  return (
    <>
      <div className="p-3 h-auto rounded bg-gray-100 dark:bg-gray-800">
        <div className="flex py-1 justify-between w-full text-slate-600 font-semibold">
          <span className="text-lg">ORDERS</span>
          <span>
            <FontAwesomeIcon icon="fa-solid fa-layer-group" size="xl" />
          </span>
        </div>
        <h2 className="font-semibold py-1 text-lg">1,528</h2>
        <div className="py-1 w-full inline-block">
          <span className="text-xs mr-2 bg-yellow-400 font-bold rounded-sm p-0.5 text-white">
            12,3%
          </span>
          <span className="text-xs">From previous period</span>
        </div>
      </div>
    </>
  );
}
export default CardTwo;