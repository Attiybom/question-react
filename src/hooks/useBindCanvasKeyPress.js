import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  removeComponent,
  copySelectedComponent,
  pasteCopiedComponent,
} from "@/store/componentsReducer";
import { ActionCreators } from "redux-undo";

/**
 * @description 需要判断当前的光标选中的元素是否是画布中的元素，而非是属性面板或左侧组件库中的元素
 */

function isActiveElementVaild() {
  // 通过 document.activeElement 能获取到当前光标选中的元素
  const activeElem = document.activeElement;

  // 光标没有focus到input类元素 => 仅适用于没有添加dnd-kit前
  // if (activeElem === document.body) return true;

  // 光标没有focus到input类元素 => 适用于添加dnd-kit后
  if (activeElem === document.body) return true;
  // role="button" => css查询器
  if (activeElem?.matches(`div[role="button"]`)) return true;

  //

  // 光标focus到input类元素，即当前用户可能在删除输入框的文字
  return false;
}

export default function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    // 如果当前元素是输入框类元素，则直接返回
    if (!isActiveElementVaild()) return;
    dispatch(removeComponent());
  });

  // 复制组件 => window电脑ctrl + v & mac电脑 meta + v
  useKeyPress(["ctrl.c", "meta.c"], () => {
    // 如果当前元素是输入框类元素，则直接返回
    if (!isActiveElementVaild()) return;
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    // 如果当前元素是输入框类元素，则直接返回
    if (!isActiveElementVaild()) return;
    dispatch(pasteCopiedComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true, // 严格匹配，必须只按了ctrl+z
    }
  );

  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    dispatch(ActionCreators.redo());
  });
}
