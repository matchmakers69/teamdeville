import { categoryPagesMapper } from '../services/CategoryPagesMenuMapper';
import constants from '../../../../constants';
const { ENGINE_BUILDING, ROLL_CAGES, SINGLE_SEATER } = constants;

describe('#categoryPagesMapper', () => {
  it('should return static pages array', () => {
    const pages = [
      {
        title: 'Engine building Service',
        path: ENGINE_BUILDING,
      },
      {
        title: 'Cages',
        path: ROLL_CAGES,
      },
      {
        title: 'Single Seater',
        path: SINGLE_SEATER,
      },
    ];

    const pagesArray = categoryPagesMapper(pages);
    expect(pagesArray.length).toEqual(pages.length);
  });
});
