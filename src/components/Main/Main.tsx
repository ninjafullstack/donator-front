import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveCampaigns as setActiveCampaignsReducer, setAllCampaigns as setAllCampaignsReducer, setIsActive as setIsActiveReducer} from "../../store/slices/campaignSlice";
import CampaignsList from "../Campaigns";
import "./Main.css";

export default function Main() {
  const [rerenderTrigger, setRerenderTrigger] = useState(false);

  const dispatch = useAppDispatch();
  const setAllCampaigns = (value: any) => dispatch(setAllCampaignsReducer(value));
  const setActiveCampaigns = (value: any) => dispatch(setActiveCampaignsReducer(value));
  const setIsActive = (value: any) => dispatch(setIsActiveReducer(value));
  const isAllOrActive = useAppSelector((state: any) => state.campaign.isActive);
  useEffect(() => {
    (async () => {
      setAllCampaigns((await axios.get("http://localhost:3000/campaign/all")).data);
      setActiveCampaigns((await axios.get("http://localhost:3000/campaign/active")).data)
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderTrigger, isAllOrActive]);

  return (
    <div className="main-container">
      <header>
        <h1 className="title">DONATIONS</h1>
        <label htmlFor="">Only Active: <input onChange={(event) => setIsActive(event.target.checked)} type="checkbox" className="checkbox" /></label>
        
      </header>
      <main>
        <CampaignsList
          setRerenderTrigger={setRerenderTrigger}
          rerenderTrigger={rerenderTrigger}
        />
      </main>
    </div>
  );
}
