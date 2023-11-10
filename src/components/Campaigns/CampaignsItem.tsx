import axios from "axios";
import { useState } from "react";
import { ICampaign } from "../../interfaces/campaign.interface";

interface Props {
  item: ICampaign;
  setRerenderTrigger: (value: boolean) => void;
  rerenderTrigger: boolean;
}

export default function CampaignsItem({ item, setRerenderTrigger, rerenderTrigger }: Props) {
  const { status, goal, id, name, desc } = item;
  const [nickname, setNickname] = useState("");
  const [amount, setAmount] = useState("");

  const statusDecoder = () => {
    switch (+status) {
      case 1: return 'ACTIVE';
      case 2: return  'SUCCESS';
      case 3: return 'FRAUD';
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post("http://localhost:3000/donation", {
      name: nickname,
      amount: +amount,
      campaignId: id,
    });

    setRerenderTrigger(!rerenderTrigger);
    setNickname("");
    setAmount("");
  };

  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    },
    { threshold: 1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  return (
    <div className="card">
      <h2 className="campaigns__name">{name}</h2>
      <p className="campaigns__description">{desc}</p>
      <div className="container">
        <div className="card__info">
          <h3 className="campaigns-item__status">{`Status: ${statusDecoder()}`}</h3>
          <p className="campaigns-item__goal">{`Goal: ${goal} USD`}</p>
        </div>
        <form onSubmit={handleSubmit} action="" className="card__form">
          <label>
            Nickname:
            <input
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
              type="text"
              className="card__input"
            />
          </label>
          <label>
            Amount USD:
            <input
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              type="text"
              className="card__input"
            />
          </label>
          <button className="campaigns-item__donate">Donate</button>
        </form>
      </div>
    </div>
  );
}
