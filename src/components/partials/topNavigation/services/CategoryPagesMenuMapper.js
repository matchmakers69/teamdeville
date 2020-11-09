export const categoryPagesMapper = (constants) => {
  const { ENGINE_BUILDING, ROLL_CAGES, SINGLE_SEATER } = constants;
  return [
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
};
