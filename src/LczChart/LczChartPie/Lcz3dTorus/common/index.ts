import { getSize } from '../../../../common/util'
import { GeneralPieDataMap } from '../../../common/type'
import { CameraSettings, GlobalConfig, PieConfig } from '../type'

export const activePie = (dataMemo: GeneralPieDataMap[], options, pieConfig: PieConfig, index, current) => {
  try {
    if (index < 0 || index > dataMemo.length - 1) return options
    const { contour = true, height = 4.5, minHeight = 4.5, maxHeight = 6 } = pieConfig
    const pieDataValue = dataMemo.map(v => Number(v.value))
    const dataRange = {
      min: Math.min(...pieDataValue),
      max: Math.max(...pieDataValue)
    }

    const series: any = options.series
    const k = series[index].pieStatus.k
    const startRatio = series[index].pieData.startRatio
    const endRatio = series[index].pieData.endRatio

    const size = minHeight <= maxHeight ? { min: minHeight, max: maxHeight } : { min: maxHeight, max: minHeight }
    const h = i => (contour ? height : getSize(dataRange, size, series[i].pieData.value))

    series.forEach((item, i) => {
      if (i <= dataMemo.length - 1) {
        if (i !== index) {
          item.parametricEquation = getParametricEquation(
            item.pieData.startRatio,
            item.pieData.endRatio,
            false,
            false,
            k,
            h(i)
          )
          item.itemStyle.opacity = 1
        } else {
          const changeHeight = current.highGrowth > 0 ? h(i) * current.highGrowth : 1
          item.parametricEquation = getParametricEquation(startRatio, endRatio, false, false, k, changeHeight)
          item.itemStyle.opacity = current.opacity || 0
        }
      }
    })
  } catch (error) {
    console.log(error)
  }

  return options
}

// 生成3d饼图全局options
export const getGlobalOptions = (config: GlobalConfig) => {
  const { bgColor, cameraSettings, margin } = config
  const { visualAngle, sightDistance } = cameraSettings as CameraSettings
  const options = {
    backgroundColor: bgColor,
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: 10,
      top: margin?.t,
      left: margin?.l,
      viewControl: {
        alpha: visualAngle,
        distance: sightDistance,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false
      },
      postEffect: {
        enable: false
      }
    }
  }
  return options
}

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2

  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}

export const getPie3D = (pieData, config: PieConfig) => {
  try {
    const {
      innerOutRadiusRatio = 0.75,
      contour = true,
      height = 4.5,
      minHeight = 4.5,
      maxHeight = 6
    } = config as PieConfig

    const internalDiameterRatio = innerOutRadiusRatio
    const series: any[] = []
    let sumValue = 0
    let startValue = 0
    let endValue = 0
    const k =
      typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value

      const seriesItem = {
        name: pieData[i].item || '',
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false
        },
        pieData: { ...pieData[i] },
        pieStatus: {
          selected: false,
          hovered: false,
          k: k
        },
        itemStyle: {
          opacity: 1
        }
      }

      series.push(seriesItem)
    }

    const pieDataValue = pieData.map(v => v.value)

    const dataRange = {
      min: Math.min(...pieDataValue),
      max: Math.max(...pieDataValue)
    }
    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    const size = minHeight <= maxHeight ? { min: minHeight, max: maxHeight } : { min: maxHeight, max: minHeight }
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value

      const h = contour ? height : getSize(dataRange, size, series[i].pieData.value)

      series[i].pieData.startRatio = startValue / sumValue
      series[i].pieData.endRatio = endValue / sumValue
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        h
      )

      startValue = endValue
    }

    // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      itemStyle: {
        opacity: 0
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20
        },
        x: function (u, v) {
          return Math.sin(v) * Math.sin(u) + Math.sin(u)
        },
        y: function (u, v) {
          return Math.sin(v) * Math.cos(u) + Math.cos(u)
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? 0.1 : -0.1
        }
      }
    })

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
      tooltip: {
        show: false
      },

      series: series
    }
    return option
  } catch (error) {
    return null
  }
}
