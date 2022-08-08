import { TailSpin } from "react-loader-spinner";
import css from './Loader.module.css';


export const Loader = () => {
  return (
    <div className={css.Loader}>
      <TailSpin color="#3322ce" height={80} width={80} />
    </div>
  );
}
