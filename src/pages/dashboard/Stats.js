import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../reducers/allRecordsSlice";
import { StatsContainer, ChartsContainer } from "../../components";

const Stats = () => {
  // const { isLoading } = useSelector((store) => store.allRecords);
  const monthlyApplications = useSelector(
    (state) => state.allRecords.stats.monthlyApplications || {}
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);
  // console.log(monthlyApplications);

  return (
    <div>
      <StatsContainer />
      {Object.keys(monthlyApplications).length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
