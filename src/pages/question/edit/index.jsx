// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getQuestionService } from "../../../services/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "@/store/componentsReducer";
import LeftPanel from "./leftPanel/LeftPanel";
import RightPanel from "./rightPanel/RightPanel";
import EditHeader from "./EditHeader/EditHeader";
import { useTitle } from "ahooks";

export default function Index() {
  // const { id = "" } = useParams();

  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});

  // // useEffect 无法直接执行async
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id);
  //     // console.info("getQuestion", data);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }
  //   fn();
  // }, []);

  // 加载问卷信息，这个hooks会发送ajax请求，并把请求得到的数据存到store中
  const { loading } = useLoadQuestionData();

  const dispatch = useDispatch();
  const clearSelectedId = () => {
    dispatch(changeSelectedId(""));
  };

  // 修改标题
  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: `40px` }}>
        <EditHeader></EditHeader>
      </div>
      {/* <div>{!waitingUserData && <Outlet></Outlet>}</div> */}
      <div className={styles[`content-wrapper`]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles[`canvas-wrapper`]}>
              <div style={{ height: `900px` }}>
                <EditCanvas loading={loading}></EditCanvas>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
