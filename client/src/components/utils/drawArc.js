import { useState } from "react";

function DrawArc({ x, y, radius, startAngle, endAngle, outerWidth, outerHeight, svgWidth, svgHeight, svgViewBox, className, arcWidth, arcColor }) {
    const defaultProps = {
        tintColor: 'white',
        lineCap: 'round',
    };
    const pathD = circlePath(x, y, radius, startAngle, endAngle);
    const [dragging, setDragging] = useState(false);
    const [instance, setInstance] = useState(1);

    let angleDifference = endAngle - startAngle;

    return (
        <div className={className} style={{ width: outerWidth, height: outerHeight }}>
            <svg width={svgWidth} height={svgHeight} viewBox={svgViewBox}>
                <g>
                    <path
                        d={pathD}
                        stroke={arcColor}
                        strokeWidth={arcWidth}
                        strokeDasharray={(angleDifference / 180) * Math.PI * radius}
                        strokeDashoffset={(-(angleDifference / 180) * Math.PI * radius) * (1 - instance)}
                        strokeLinecap={defaultProps.lineCap}
                        fill="transparent"
                    />
                </g>
            </svg>
        </div>
    )
}

function circlePath(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}
export default DrawArc;