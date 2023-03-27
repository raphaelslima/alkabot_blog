import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./user.css";

import api from "../../services/api";

export default () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const response = await api.get(`users/${id}`);
    setUser(response.data);
  }

  console.log(user);

  return (
    <div className="container-perfil">
      <div className="perfil">
        <h2 className="title-section">{user.name}</h2>
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>

        <div className="line"></div>
        <section className="information">
          <label htmlFor="">Telefone:</label>
          <input type="text" value={user.phone} readOnly />
          <label htmlFor="">Email:</label>
          <input type="text" value={user.email} />
          <label htmlFor="">Site:</label>
          <input type="text" value={user.website} />
        </section>
        <h4 className="title-section">Endereço</h4>
        <div className="line"></div>
        {user.address ? (
          <section className="information">
            <div className="par">
              <div className="field">
                <label htmlFor="">Cidade:</label>
                <input type="text" value={user.address.city} />
              </div>
              <div className="field">
                <label htmlFor="">Rua:</label>
                <input type="text" value={user.address.street} />
              </div>
            </div>
            <div className="par">
              <div className="field">
                <label htmlFor="">CEP:</label>
                <input type="text" value={user.address.zipcode} />
              </div>
              <div className="field">
                <label htmlFor="">Complemento:</label>
                <input type="text" value={user.address.suite} />
              </div>
            </div>
          </section>
        ) : (
          false
        )}
        <h2 className="title-section">Informações da empresa</h2>
        <div className="line"></div>
        {user.company ? (
          <section className="information">
            <div className="information">
              <div className="par">
                <div className="field">
                  <label htmlFor="">Nome:</label>
                  <input type="text" value={user.company.name} />
                </div>
                <div className="field">
                  <label htmlFor="">catchPhrase:</label>
                  <input type="text" value={user.company.catchPhrase} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="">bs:</label>
                <input type="text" value={user.company.bs} />
              </div>
            </div>
          </section>
        ) : (
          false
        )}
      </div>
    </div>
  );
};
