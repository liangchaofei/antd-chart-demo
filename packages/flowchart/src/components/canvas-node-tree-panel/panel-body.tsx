// #boyu
import React, { Fragment } from 'react';
import { Empty, Popover } from 'antd';
import { IProps, ITreeNode, IOnFolderExpand, INodeFactoryArgs } from './interface';
import { Addon } from '@antv/x6';
import {
  MODELS,
  IModelService,
  useModelAsync,
  IGraphConfig,
  NsGraph,
  getNodeReactComponent,
  useXFlowContext,
  IGraphCommandService,
} from '@ali/xflow';
import { NsTreePanelData } from './service';
import { XFlowNode } from './node';

export const defaultNodeFactory = (args: INodeFactoryArgs) => {
  return new XFlowNode(args);
};

interface IConfigRenderOptions {
  graphConfig: IGraphConfig;
  modelService: IModelService;
  commandService: IGraphCommandService;
  nodeConfig: NsGraph.INodeConfig;

  onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const renderNode = (props: IConfigRenderOptions) => {
  const { nodeConfig, onMouseDown, graphConfig, modelService, commandService } = props;

  if (!graphConfig) {
    return <div />;
  }

  const renderKey = graphConfig.nodeTypeParser(nodeConfig);
  const reactComponent = graphConfig.nodeRender.get(renderKey);

  return (
    <div onMouseDown={onMouseDown}>
      {React.createElement(reactComponent as React.FC<any>, {
        commands: commandService,
        modelService: modelService,
        data: nodeConfig,
        isNodeTreePanel: true,
      })}
    </div>
  );
};

interface ITitleProps {
  prefixClz: string;
  item: any;
  graphConfig: any;
  modelService: IModelService;
  commandService: IGraphCommandService;
  popoverContent: React.ReactNode;
  onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const NodeTitle = (props: ITitleProps) => {
  const [isVisible, setVisible] = React.useState(false);
  const { prefixClz, graphConfig, commandService, modelService, popoverContent, onMouseDown, item } = props;
  return (
    <>
      {popoverContent && (
        <Popover
          placement="right"
          destroyTooltipOnHide
          content={popoverContent}
          visible={isVisible}
          style={{
            color: 'red',
          }}
          onVisibleChange={(val) => {
            setVisible(val);
          }}
        >
          <div
            className={`${prefixClz}-node-wrapper`}
            onMouseEnter={() => {
              setVisible(true);
            }}
          >
            {renderNode({
              graphConfig,
              commandService: commandService,
              onMouseDown,
              modelService,
              nodeConfig: item,
            })}
          </div>
        </Popover>
      )}
      {!popoverContent && (
        <div
          className={`${prefixClz}-node-wrapper`}
          onMouseEnter={() => {
            setVisible(true);
          }}
        >
          {renderNode({
            graphConfig,
            commandService: commandService,
            onMouseDown,
            modelService,
            nodeConfig: item,
          })}
        </div>
      )}
    </>
  );
};
export interface IBodyProps extends IProps {
  state: NsTreePanelData.IState;
  onFolderExpand: IOnFolderExpand;
}

export const NodePanelBody: React.FC<IBodyProps> = (props) => {
  const { x6NodeFactory, dndOptions, onNodeDrop, state, prefixClz = '' } = props;
  const { modelService, commandService } = useXFlowContext();

  const [dnd, setDnd] = React.useState<Addon.Dnd>();
  /** 获取graph实例 */
  const [graph] = useModelAsync<MODELS.CURRENT_GRAPH.IState, null>({
    getModel: async () => {
      return MODELS.CURRENT_GRAPH.getModel(modelService);
    },
    initialState: null,
  });

  const [graphConfig] = useModelAsync<MODELS.GRAPH_CONFIG.IState, null>({
    getModel: async () => {
      return MODELS.GRAPH_CONFIG.getModel(modelService);
    },
    initialState: null,
  });

  React.useEffect(() => {
    if (!graph) {
      return;
    }
    const dndInstance = new Addon.Dnd({
      scaled: false,
      animation: false,
      ...dndOptions,
      target: graph,
      /** 这里考虑到需要新增群组的需求，不使用x6的getDropNod方法
       * 在validateNode时调用command添加
       */
      validateNode: async (droppingNode, options) => {
        const nodeConfig = {
          ...droppingNode.getData<NsGraph.INodeConfig>(),
          ...droppingNode.getPosition(),
        };
        if (onNodeDrop) {
          await onNodeDrop(nodeConfig, commandService, modelService);
        } else {
          // console.error('onNodeDrop method is required in NodeTree Panel');
        }
        return false;
      },
    });
    setDnd(dndInstance);
  }, [graph]);

  const onMouseDown = (nodeConfig: NsGraph.INodeConfig) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!graph || !dnd || !graphConfig) {
      return;
    }
    const { width = 180, height = 40 } = nodeConfig;
    const renderKey = graphConfig.nodeTypeParser(nodeConfig);
    const reactComponent = graphConfig.nodeRender.get(renderKey);
    if (reactComponent) {
      const wrappedComponent = getNodeReactComponent(reactComponent, commandService, modelService);
      const nodeData = {
        data: nodeConfig,
        width,
        height,
        // X6_NODE_PORTAL_NODE_VIEW
        view: graphConfig.flowId,
        component: wrappedComponent,
      };
      const x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : defaultNodeFactory(nodeData);
      dnd.start(x6Node, e.nativeEvent as any);
    }
  };

  const renderTree = React.useCallback(
    (treeList: ITreeNode[] = []) => {
      return treeList.map((item) => {
        const { popoverContent } = item;
        return (
          <NodeTitle
            item={item}
            key={item.id}
            onMouseDown={onMouseDown(item)}
            popoverContent={popoverContent}
            prefixClz={prefixClz}
            modelService={modelService}
            commandService={commandService}
            graphConfig={graphConfig}
          />
        );
      });
    },
    [graphConfig],
  );
  const customNode = state.treeData.filter((item) => item.isCustom);
  const officialNode = state.treeData.filter((item) => !item.isCustom);

  return (
    <React.Fragment>
      {/* <div className={`${prefixClz}-body`} style={props.style}> */}
      <div className={`${prefixClz}-body`}>
        {!state.keyword && (
          <Fragment>
            <div className={`${prefixClz}-official`}>{renderTree(officialNode)}</div>
            {customNode.length && <div className={`${prefixClz}-custom`}>{renderTree(customNode)}</div>}
          </Fragment>
        )}
        {state.searchList.length > 0 && (
          <ul className={`${prefixClz}-body-list`}>
            {state.searchList.map((treeNode) => (
              <li className={`${prefixClz}-body-list-item`}>
                <NodeTitle
                  item={treeNode}
                  onMouseDown={onMouseDown(treeNode)}
                  popoverContent={treeNode.popoverContent}
                  prefixClz={prefixClz}
                  modelService={modelService}
                  commandService={commandService}
                  graphConfig={graphConfig}
                />
              </li>
            ))}
          </ul>
        )}

        {state.keyword && state.searchList.length === 0 && <Empty style={{ marginTop: '48px' }} />}
      </div>
    </React.Fragment>
  );
};