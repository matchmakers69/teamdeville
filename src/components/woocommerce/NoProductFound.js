import React from 'react';

const NoProductFound = () => (
  <section className="section top__indent-large">
    <div className="container fluid">
      <div className="row">
        <div className="col-xs-12">
          <h3 className="titleNotFound">
            Sorry...We could not find anything. <br /> However fetching data may
            take some time
          </h3>
        </div>
      </div>
    </div>
  </section>
);

export default NoProductFound;
