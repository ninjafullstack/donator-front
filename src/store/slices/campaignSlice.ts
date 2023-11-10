import { ICampaign } from './../../interfaces/campaign.interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampaignState {
  allCampaigns: ICampaign[];
  activeCampaigns: ICampaign[];
  isActive: boolean;
}

const initialState: CampaignState = {
  allCampaigns: [],
  activeCampaigns: [],
  isActive: false,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setAllCampaigns: (state, action: PayloadAction<any[]>) => {
      state.allCampaigns = action.payload;
    },
    setActiveCampaigns: (state, action: PayloadAction<any[]>) => {
      state.activeCampaigns = action.payload;
    },
    setIsActive: (state, action: PayloadAction<any>) => {
      state.isActive = action.payload;
    }
  },
});

export const { setAllCampaigns, setActiveCampaigns, setIsActive } = campaignSlice.actions;

const campaignReducer = campaignSlice.reducer;
export default campaignReducer;
