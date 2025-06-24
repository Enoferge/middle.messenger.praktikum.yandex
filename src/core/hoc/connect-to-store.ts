import { StoreEvents } from '@/core/store/store';
import type { State } from '@/core/store/types';
import type { BlockClass, Props } from '@/core/block/types';
import isEqual from '@/utils/is-equal';

export function connect<
  TProps extends Props,
  TState extends State>(mapStateToProps: (state: TState) => Partial<TProps>) {
  return function (Component: BlockClass<TProps>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props?: TProps) {
        const { store } = window;
        let state = mapStateToProps(store.getState());

        super({ ...(props || {}), ...state } as TProps);

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };
      }

      componentDidMount() {
        console.log('component did mount HOC CONNECT');
        window.store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        super.componentDidMount();
      }

      componentWillUnmount() {
        console.log('component will unmount HOC CONNECT');
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
