<div class='custom-api-docs'>

*ComponentAnimateOption* is configured for each component animation type.

```ts
```

Where 'animation' passes in the name of the animation function, the built-in default animation function is shown in the table below, and you can also customize the animation function through 'registerAnimation'.

**Effects of animation**, go to see [Examples](/en/examples/dynamic-plots/animation) for more information

| Animation         | Effect      | Description                                 | Not suitable |
| ----------------- | -------| --------------- |-------- |
| 'fade-in'         | ![fade-in.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*LTRRRL8JwfQAAAAAAAAAAABkARQnAQ)                                                                                                          | 渐现动画。                                                       | |
| 'fade-out'        | ![fade-out.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*s4Y4S5JJ6WEAAAAAAAAAAABkARQnAQ)                                                                                                         | 渐隐动画。                                                       | |
| 'grow-in-x'       | ![grow-in-x.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ)                                                                                                        | 容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。   | 不适用于饼图、玫瑰图等 polar、theta 坐标系下的图表以及柱、条状图 |
| 'grow-in-y'       | ![grow-in-y.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*L6mkQa3aG64AAAAAAAAAAABkARQnAQ)                                                                                                        | 容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。   | 不适用于饼图、玫瑰图等 polar、theta 坐标系下的图表以及柱、条状图 |
| 'grow-in-xy'      | ![grow-in-xy.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*LfPrQouGwYIAAAAAAAAAAABkARQnAQ)                                                                                                       | 容器沿着 x,y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。 ||
| 'scale-in-x'      | ![scale-in-x.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ)                                                                                                       | 单个图形沿着 x 方向的生长动画。                                  ||
| 'scale-in-y'      | ![scale-in-y.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*T6mLTY3o9OoAAAAAAAAAAABkARQnAQ)                                                                                                       | 单个图形沿着 y 方向的生长动画。                                  ||
| 'wave-in'         | ![wave-in-p.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*W5CdQIWw-M4AAAAAAAAAAABkARQnAQ)![wave-in-r.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ) | 划入入场动画效果，不同坐标系下效果不同。                         ||
| 'zoom-in'         | ![zoom-in.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ)                                                                                                          | 沿着图形中心点的放大动画。                                       ||
| 'zoom-out'        | ![zoom-out.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*PZ2gTrkV29YAAAAAAAAAAABkARQnAQ)                                                                                                         | 沿着图形中心点的缩小动画。                                       ||
| 'path-in'         | ![path-in.gif](https://gw.alipayobjects.com/mdn/rms\_f5c722/afts/img/A\*gxZ1RIIMtdIAAAAAAAAAAABkARQnAQ)                                                                                                          | path 路径入场动画。                                              ||
| 'position-update' |                                                                                                                                                                                                                | 图形位置移动动画。                                               | 限用于图表标签 label 上 |

</div>
