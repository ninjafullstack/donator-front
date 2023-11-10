import CampaignsItem from "./CampaignsItem";
import "./Campaigns.css";
import { useAppSelector } from "../../store/hooks";
import { ICampaign } from "../../interfaces/campaign.interface";

interface Props {
  setRerenderTrigger: (value: boolean) => void;
  rerenderTrigger: boolean;
}

export default function CampaignsList({
  rerenderTrigger,
  setRerenderTrigger,
}: Props) {
  const allCampaigns = useAppSelector((state: any) => state.campaign.allCampaigns);
  const activeCampaigns = useAppSelector((state: any) => state.campaign.activeCampaigns);
  const isAllOrActive = useAppSelector((state: any) => state.campaign.isActive);
  const visibleCampaignst = isAllOrActive ? activeCampaigns : allCampaigns;

  return (
    <div className="cards-container">
      {visibleCampaignst.map((item: ICampaign) => (
        <CampaignsItem
          key={item.id}
          item={item}
          setRerenderTrigger={setRerenderTrigger}
          rerenderTrigger={rerenderTrigger}
        />
      ))}
    </div>
  );
}
