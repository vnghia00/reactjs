import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllBA, deleteBA, createNewBA, updateBA } from "../../services/userService";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import * as actions from "../../store/actions";
import ThongKeDTNam from "./ThongKeDTNam";

class ThongKeMonAn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrHD: [],
			arrBA: [],
			ttDT: [],
			dateTK: "",
			series: [
				{
					name: "Số lượng",
					data: [],
				},
			],
			options: {
				chart: {
					type: "bar",
					height: 580,
				},
				plotOptions: {
					bar: {
						barHeight: "100%",
						distributed: true,
						horizontal: true,
						dataLabels: {
							position: "bottom",
						},
					},
				},
				colors: [
					"#33b2df",
					"#546E7A",
					"#d4526e",
					"#13d8aa",
					"#A5978B",
					"#2b908f",
					"#f9a3a4",
					"#90ee7e",
					"#f48024",
					"#69d2e7",
				],
				dataLabels: {
					enabled: true,
					textAnchor: "start",
					style: {
						colors: ["#fff"],
						// fontSize: ['1rem'],
						// textTransform: ["capitalize"],
						// marginLeft: "1rem"
						// border: '1px solid #000',
					},
					formatter: function (val, opt) {
						return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
					},
					offsetX: 0,
					dropShadow: {
						enabled: true,
					},
				},
				stroke: {
					width: 1,
					colors: ["#fff"],
				},
				xaxis: {
					categories: [],
					title: {
						text: "Số lần được sử dụng",
						style: {
							fontSize: "15px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				yaxis: {
					labels: {
						show: false,
					},
					title: {
						text: "Bàn ăn",
						style: {
							fontSize: "15px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				title: {
					text: "",
					align: "center",
					floating: true,
				},

				tooltip: {
					theme: "dark",
					x: {
						show: false,
					},
					y: {
						title: {
							formatter: function () {
								return "";
							},
						},
					},
				},
			},
			series2: [
				{
					name: "Số lượng",
					data: [],
				},
			],
			options2: {
				chart: {
					height: 350,
					type: 'bar',
					events: {
					  click: function(chart, w, e) {
						// console.log(chart, w, e)
					  }
					}
				  },
				  colors: [
					"#33b2df",
					"#546E7A",
					"#d4526e",
					"#13d8aa",
					"#A5978B",
					"#2b908f",
					"#f9a3a4",
					"#90ee7e",
					"#f48024",
					"#69d2e7",
				],
				  plotOptions: {
					bar: {
					  columnWidth: '45%',
					  distributed: true,
					}
				  },
				  dataLabels: {
					enabled: true,
					style: {
						colors: ['#000']
					},
					formatter: function (val, opt) {
						var tongtien = new Intl.NumberFormat("vi-VN", {
							maximumSignificantDigits: 3,
						}).format(val);
						return tongtien;
					},
				  },
				  legend: {
					show: false
				  },
				  xaxis: {
					categories: [],
					title: {
						text: "Bàn ăn",
						style: {
							fontSize: "15px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
					labels: {
					  style: {
						colors: [
							"#33b2df",
							"#546E7A",
							"#d4526e",
							"#13d8aa",
							"#A5978B",
							"#2b908f",
							"#f9a3a4",
							"#90ee7e",
							"#f48024",
							"#69d2e7",
						],
						fontSize: '12px'
					  }
					}
				  },
				yaxis: {
					labels: {
						formatter: function (val) {
							var tongtien = new Intl.NumberFormat("vi-VN", {
								maximumSignificantDigits: 3,
							}).format(val);
							return tongtien;
						},
					},
					title: {
						text: "VNĐ",
						style: {
							fontSize: "15px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
			},
		};
	}

	componentDidMount() {
		this.props.getBanAnStart();
		this.props.getHDStart();

		var month = new Date().getMonth() + 1;
		var date = new Date(2022, month, 0);
		this.setState({
			dateTK: date,
		});
	}
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		const arr = this.props.HDRedux.filter((item) => {
			return item.trangThaiHD == 1;
		});
		if (prevProps.HDRedux !== this.props.HDRedux) {
			this.setState({
				arrHD: arr,
			});
		}
		const arrBA = this.props.BARedux;
		if (prevProps.HDRedux !== this.props.HDRedux) {
			this.setState({
				arrBA: arrBA,
			});
		}

		if (prevState.arrBA !== this.state.arrBA) {
			var date = this.state.dateTK;
			const monthTK = date.toISOString().slice(0, 7);
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 7) == monthTK;
			});
			let ban = [];
			let DTban = [];
			let arrdataday = [];
			for (let index = 0; index < this.state.arrBA.length; index++) {
				ban = [...ban, this.state.arrBA[index].tenBanAn];
				const arrDataDay = arr.filter((item) => {
					return item.idBanAn == this.state.arrBA[index].id;
				});

				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + 1;
				}, 0);
				const dataday2 = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
				DTban = [...DTban, dataday2];
			}
			this.setState({
				series: [
					{
						name: "Bàn ăn",
						data: arrdataday,
					},
				],
				options: {
					...this.state.options,
					xaxis: {
						categories: ban,
					},
					title: {
						text: `Bàn ăn được sử dụng nhiều trong tháng ${date.getMonth() + 1}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				series2: [
					{
						name: "Bàn ăn",
						data: DTban,
					},
				],
				options2: {
					...this.state.options2,
					xaxis: {
						categories: ban,
					},
					title: {
						text: `Doanh thu từng bàn ăn trong tháng ${date.getMonth() + 1}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				ttDT: arrdataday,
			});
		}

		if (prevState.arrHD !== this.state.arrHD) {
			var date = this.state.dateTK;
			const monthTK = date.toISOString().slice(0, 7);
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 7) == monthTK;
			});
			let ban = [];
			let DTban = [];
			let arrdataday = [];
			for (let index = 0; index < this.state.arrBA.length; index++) {
				ban = [...ban, this.state.arrBA[index].tenBanAn];
				const arrDataDay = arr.filter((item) => {
					return item.idBanAn == this.state.arrBA[index].id;
				});

				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + 1;
				}, 0);

				const dataday2 = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
				DTban = [...DTban, dataday2];
			}
			this.setState({
				series: [
					{
						name: "Bàn ăn",
						data: arrdataday,
					},
				],
				options: {
					...this.state.options,
					xaxis: {
						categories: ban,
					},
					title: {
						text: `Bàn ăn được sử dụng nhiều trong tháng ${date.getMonth() + 1}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				series2: [
					{
						name: "Bàn ăn",
						data: DTban,
					},
				],
				options2: {
					...this.state.options2,
					xaxis: {
						categories: ban,
					},
					title: {
						text: `Doanh thu từng bàn ăn trong tháng ${date.getMonth() + 1}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					},
				},
				ttDT: arrdataday,
			});
		}
		
	};
	// handleOnChangeDateInput = (e)=>{
	// 	var date = new Date(2022, e.target.value, 0);
	// 	this.setState({
	// 		dateTK: date
	// 	})
	// }

	render() {
		// var m = new Date()
		// var m2= this.state.dateTK == "" ? new Date() : this.state.dateTK
		console.log(this.state);
		// var formatter = new Intl.NumberFormat("en-US", {
		// 	style: "currency",
		// 	currency: "VND",
		// });
		return (
			<div className="chuc-vu-container mb-5">
				<div className="container">
					<div className="row">

						<div className="col-12 mb-3 header-manage-user">
							<b>Thống kê bàn ăn</b>
						</div>

						<div className="col-12">
							<div id="chart" className="mt-5">
							<ReactApexChart
								options={this.state.options}
								series={this.state.series}
								type="bar"
								height={580}
							/>
							</div>
						</div>

						<div className="line-chart"
						style={{
							display: 'flex',
							width: '90%',
							height: '2px',
							background: '#000',
							margin: '10px auto'
						}}
						>
						</div>

						<div className="col-12">
							<div id="chart" className="mt-5">
								<ReactApexChart
									options={this.state.options2}
									series={this.state.series2}
									type="bar"
									height={380}
								/>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		HDRedux: state.admin.HD,
		BARedux: state.admin.BA,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getHDStart: () => dispatch(actions.fetchHDStart()),
		getBanAnStart: () => dispatch(actions.fetchBanAnStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeMonAn);
