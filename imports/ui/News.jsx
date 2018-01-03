import React, { Component } from 'react';

export default class News extends Component {
  render() {
    return (
      <div className="home">
        <div className="card card-custom-bg">
          <div className="card-body">
            <div className="card-title">
              Neler yapılabilir ?
            </div>
            <p className="card-text">
                - Şu aşamada hiçbirşey!
            </p>
          </div>
        </div>
        <div className="card card-block card-custom-bg">
          <div className="card-body">
            <div className="card-title">
              Kısa ve Orta Vadede :
            </div>
            <p className="card-text">
              - Herkese açık sohbet odası, kişisel makale paylaşımı, herkese açık, okuma ve yorumlama imkanı,
              yazarlar arası takipleşme, profil sayfası, Android Uygulaması, ve daha fazlası...
            </p>
          </div>
        </div>
        <div className="card card-block card-custom-bg">
          <div className="card-body">
            <div className="card-title">
              Bilinen Hatalar
            </div>
            <p className="card-text">
              - Sen söyle :)
            </p>
          </div>
        </div>
      </div>
    );
  }
}
