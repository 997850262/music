import { schema } from 'normalizr';


const list = new schema.Entity('list', {}, {
  idAttribute: 'id'
});
const data = new schema.Entity('data', {
  list: [list]
}, {
  idAttribute: 'e'
});
export const Data = [data];

// const relist = new schema.Entity('relist', {}, {
//   idAttribute: 'qid'
// });
// export const Relist = [ relist ]
export const List = ({ list: [list] });
// export const List = ('list', { list: [list] });
// export const Recommenddata = {list:[]};
