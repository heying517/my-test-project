import { observable, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class Home {
  @observable homeData = 'this is home';
  // @action fun = () => {
  //   console.log(this.homeData);
  // };

  // @computed get computedData() {
  //   // return
  // }
}

const home = new Home();

export default home;
