import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllBA, deleteBA, createNewBA, updateBA } from "../../services/userService";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import * as actions from "../../store/actions";

class ThongKeDTNam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrHD: [],
			ttDT: [],
			dateTK: "",
			series: [
				{
					name: "Doanh Thu",
					data: [],
				},
			],
			options: {
				chart: {
					type: 'bar',
					height: 350
				},
				plotOptions: {
					bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded'
					},
				},
				
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				fill: {
					opacity: 1
				},
				dataLabels: {
					enabled: true,
					formatter: function (val, opt) {
						var tongtien = new Intl.NumberFormat("vi-VN", {
							maximumSignificantDigits: 3,
						}).format(val);
						return tongtien;
					},
				},
				title: {
					text: "Doanh thu năm 2022",
					align: "center",
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						fontFamily: undefined,
						color: "#263238",
					},
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					],
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
			series2: [44, 55, 13, 43, 22],
            options2: {
				title: {
					text: "",
					align: "center",
					offsetX: -40,
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						fontFamily: undefined,
						color: "#263238",
					},
				},
              chart: {
                width: 380,
                type: 'pie',
              },
              legend: {
                show: true,
				offsetX: 150,
				offsetY: 45,
              },
            },
		};
	}

	componentDidMount() {
		this.props.getHDStart();
		var date = new Date();
		this.setState({
			dateTK: date,
		})
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
		if (prevState.arrHD !== this.state.arrHD) {
			var date = this.state.dateTK
			const yearTK = date.toISOString().slice(0, 4)
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 4) == yearTK
			})
			let month = [];
			let arrdataday = [];
			for (let index = 1; index <= 12; index++) {
				if (index < 10) {
					month = [...month, "0" + index];
				} else {
					month = [...month, index];
				}
				const arrDataDay = arr.filter((item) => {
					return item.ngayNhap.slice(5, 7) == month[index - 1];
				});
				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
			}
			var lb = month.map((item, index)=>{
				return "Tháng "+item
			})
			this.setState({
				series: [
					{
						name: `Doanh Thu`,
						data: arrdataday,
					},
					
				],
				options: {
					...this.state.options,
					title: {
						text: `Doanh thu năm ${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					}
				},
				series2:arrdataday,
				options2:{
					...this.state.options2,
					labels:lb,
					title: {
						text: `Tị lệ doanh thu từng tháng tong năm ${date.getFullYear()}`,
						align: "center",
						offsetX: -40,
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					}
				},	
				ttDT: arrdataday
			});
		}

		if (prevState.dateTK !== this.state.dateTK) {
			var date = this.state.dateTK
			const yearTK = date.toISOString().slice(0, 4)
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 4) == yearTK
			})
			let month = [];
			let arrdataday = [];
			for (let index = 1; index <= 12; index++) {
				if (index < 10) {
					month = [...month, "0" + index];
				} else {
					month = [...month, index];
				}
				const arrDataDay = arr.filter((item) => {
					return item.ngayNhap.slice(5, 7) == month[index - 1];
				});
				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
			}
			var lb = month.map((item, index)=>{
				return "Tháng "+item
			})
			this.setState({
				series: [
					{
						name: `Doanh Thu`,
						data: arrdataday,
					},
					
				],
				options: {
					...this.state.options,
					title: {
						text: `Doanh thu năm ${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					}
				},
				series2: arrdataday,
				options2:{
					...this.state.options2,
					labels:lb,
					title: {
						text: `Tị lệ doanh thu từng tháng tong năm ${date.getFullYear()}`,
						align: "center",
						offsetX: -40,
						style: {
							fontSize: "20px",
							fontWeight: "bold",
							fontFamily: undefined,
							color: "#263238",
						},
					}
				},	
				ttDT: arrdataday
			});
		}
	};
	handleOnChangeDateInput = (e)=>{
		var date = new Date(e.target.value, 1, 0);
		this.setState({
			dateTK: date
		})
	}
	render() {
		var m = new Date()
		var m2= this.state.dateTK == "" ? new Date() : this.state.dateTK
		console.log(this.state);
		var formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "VND",
		});

		return (
			<div className="chuc-vu-container mt-5">
				<div className="container">
					<div className="row">
						
						<div className="col-12">
							<div id="chart">
								<Chart
									options={this.state.options}
									series={this.state.series}
									type="bar"
									height={350}
								/>
							</div>
						</div>
						<div className="col-12">
						<div
							className="line-chart"
							style={{
								display: "flex",
								width: "50%",
								height: "1px",
								background: "#000",
								margin: "10px auto",
							}}
						></div>
						</div>
						<div
							className="col-3"
							style={{
								display: 'flex',
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<label
								className=""
								style={{
									display: "block",
									height: "40px",
									lineHeight: "40px",
									fontSize: "1.2rem",
									manageBottom: "0px !important",
									paddingBottom: "0px !important",
								}}
							>
								{`Tổng doanh thu năm :  `}
								<select
										value={m2.getFullYear()}
										onChange={(e) => this.handleOnChangeDateInput(e)}
										style={{
											borderRadius: '5px',
											backgroundColor: '#53d9d0',
											width: '5rem',	
											marginLeft: '5px',
											marginRight: '10px',
										}}
									>
										<option value={m.getFullYear()}>
											{m.getFullYear()}
										</option>
										<option value={m.getFullYear()-1}>
											{m.getFullYear()-1}
										</option>
										<option value={m.getFullYear()-2}>
											{m.getFullYear()-2}
										</option>
								</select>
							</label>
							<span
								className=""
								style={{
									display: "block",
									height: "40px",
									lineHeight: "40px",
									fontWeight: "bold",
									fontSize: "1.5rem",
									manageBottom: "0px !important",
									paddingBottom: "0px !important",
								}}
							>
								{formatter.format(
									this.state.ttDT?.reduce((acc, cur) => {
										return acc + cur;
									}, 0) || 0
								)}
							</span>
						</div>
						<div className="col-9">
							<div id="chart">
								<Chart
									options={this.state.options2}
									series={this.state.series2}
									type="pie"
									height={350}
								/>
							</div>
						</div>
						<div
							className="line-chart"
							style={{
								display: "flex",
								width: "90%",
								height: "2px",
								background: "#000",
								margin: "10px auto",
							}}
						></div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		HDRedux: state.admin.HD,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getHDStart: () => dispatch(actions.fetchHDStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeDTNam);
