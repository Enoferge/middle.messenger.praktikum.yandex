import { StoreEvents } from '@/core/store/store';
import type { State } from '@/core/store/types';
import type { BlockClass, Props } from '@/core/block/types';
import isEqual from '@/utils/is-equal';

export function connect<
  TProps extends Props,
  TState extends State>(mapStateToProps: (state: TState) => Partial<TProps & TState>) {
  return function (Component: BlockClass<TProps>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props?: TProps) {
        const { store } = window;
        let state = mapStateToProps(store.getState());

        super({ ...(props || {}), ...state } as TProps & TState);

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };
      }

      componentDidMount() {
        window.store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        super.componentDidMount();
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
