import React from 'react';
import { HierarchyPointNode } from 'd3-hierarchy';
import { TreeNodeDatum, Point, RawNodeDatum } from '../types/common.js';
import { TreeLinkEventCallback, TreeNodeEventCallback, TreeProps } from './types.js';
type TreeState = {
    dataRef: TreeProps['data'];
    data: TreeNodeDatum[];
    d3: {
        translate: Point;
        scale: number;
    };
    isTransitioning: boolean;
    isInitialRenderForDataset: boolean;
    dataKey: string;
};
declare class Tree extends React.Component<TreeProps, TreeState> {
    static defaultProps: Partial<TreeProps>;
    state: TreeState;
    private internalState;
    svgInstanceRef: string;
    gInstanceRef: string;
    static getDerivedStateFromProps(nextProps: TreeProps, prevState: TreeState): Partial<TreeState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TreeProps): void;
    /**
     * Collapses all tree nodes with a `depth` larger than `initialDepth`.
     *
     * @param {array} nodeSet Array of nodes generated by `generateTree`
     * @param {number} initialDepth Maximum initial depth the tree should render
     */
    setInitialTreeDepth(nodeSet: HierarchyPointNode<TreeNodeDatum>[], initialDepth: number): void;
    /**
     * bindZoomListener - If `props.zoomable`, binds a listener for
     * "zoom" events to the SVG and sets scaleExtent to min/max
     * specified in `props.scaleExtent`.
     */
    bindZoomListener(props: TreeProps): void;
    /**
     * Assigns internal properties that are required for tree
     * manipulation to each node in the `data` set and returns a new `data` array.
     *
     * @static
     */
    static assignInternalProperties(data: RawNodeDatum[], currentDepth?: number, prevDataState?: TreeNodeDatum): TreeNodeDatum[];
    /**
     * Recursively walks the nested `nodeSet` until a node matching `nodeId` is found.
     */
    findNodesById(nodeId: string, nodeSet: TreeNodeDatum[], hits: TreeNodeDatum[]): TreeNodeDatum[];
    /**
     * Recursively walks the nested `nodeSet` until all nodes at `depth` have been found.
     *
     * @param {number} depth Target depth for which nodes should be returned
     * @param {array} nodeSet Array of nested `node` objects
     * @param {array} accumulator Accumulator for matches, passed between recursive calls
     */
    findNodesAtDepth(depth: number, nodeSet: TreeNodeDatum[], accumulator: TreeNodeDatum[]): TreeNodeDatum[];
    /**
     * Recursively sets the internal `collapsed` property of
     * the passed `TreeNodeDatum` and its children to `true`.
     *
     * @static
     */
    static collapseNode(nodeDatum: TreeNodeDatum): void;
    /**
     * Sets the internal `collapsed` property of
     * the passed `TreeNodeDatum` object to `false`.
     *
     * @static
     */
    static expandNode(nodeDatum: TreeNodeDatum): void;
    /**
     * Collapses all nodes in `nodeSet` that are neighbors (same depth) of `targetNode`.
     */
    collapseNeighborNodes(targetNode: TreeNodeDatum, nodeSet: TreeNodeDatum[]): void;
    /**
     * Finds the node matching `nodeId` and
     * expands/collapses it, depending on the current state of
     * its internal `collapsed` property.
     * `setState` callback receives targetNode and handles
     * `props.onClick` if defined.
     */
    handleNodeToggle: (nodeId: string) => void;
    handleRemoveNode: (nodeId: string, parentNodeId: string, callback?: () => void) => void;
    handleUpdateNodeAttributes: (nodeId: string, node: Omit<RawNodeDatum, 'children'>, callback?: () => void) => void;
    handleAddChildrenToNode: (nodeId: string, childrenData: RawNodeDatum[], replace?: boolean, callback?: () => void) => void;
    /**
     * Handles the user-defined `onNodeClick` function.
     */
    handleOnNodeClickCb: TreeNodeEventCallback;
    /**
     * Handles the user-defined `onLinkClick` function.
     */
    handleOnLinkClickCb: TreeLinkEventCallback;
    /**
     * Handles the user-defined `onNodeMouseOver` function.
     */
    handleOnNodeMouseOverCb: TreeNodeEventCallback;
    /**
     * Handles the user-defined `onLinkMouseOver` function.
     */
    handleOnLinkMouseOverCb: TreeLinkEventCallback;
    /**
     * Handles the user-defined `onNodeMouseOut` function.
     */
    handleOnNodeMouseOutCb: TreeNodeEventCallback;
    /**
     * Handles the user-defined `onLinkMouseOut` function.
     */
    handleOnLinkMouseOutCb: TreeLinkEventCallback;
    /**
     * Takes a hierarchy point node and centers the node on the screen
     * if the dimensions parameter is passed to `Tree`.
     *
     * This code is adapted from Rob Schmuecker's centerNode method.
     * Link: http://bl.ocks.org/robschmuecker/7880033
     */
    centerNode: (hierarchyPointNode: HierarchyPointNode<TreeNodeDatum>) => void;
    /**
     * Generates tree elements (`nodes` and `links`) by
     * grabbing the rootNode from `this.state.data[0]`.
     * Restricts tree depth to `props.initialDepth` if defined and if this is
     * the initial render of the tree.
     */
    generateTree(): {
        nodes: HierarchyPointNode<TreeNodeDatum>[];
        links: import("d3-hierarchy").HierarchyPointLink<TreeNodeDatum>[];
    };
    /**
     * Set initial zoom and position.
     * Also limit zoom level according to `scaleExtent` on initial display. This is necessary,
     * because the first time we are setting it as an SVG property, instead of going
     * through D3's scaling mechanism, which would have picked up both properties.
     *
     * @static
     */
    static calculateD3Geometry(nextProps: TreeProps): {
        translate: Point;
        scale: any;
    };
    static getNodeProps: (node: RawNodeDatum, nodeKey: string) => any;
    /**
     * Determines which additional `className` prop should be passed to the node & returns it.
     */
    getNodeClassName: (parent: HierarchyPointNode<TreeNodeDatum>, nodeDatum: TreeNodeDatum) => string;
    render(): JSX.Element;
}
export default Tree;
