import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllBA, deleteBA, createNewBA, updateBA } from "../../services/userService";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import * as actions from "../../store/actions";
import ThongKeDTNam from "./ThongKeDTNam";

class ThongKe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrHD: [],
			ttDT: [],
			dateTK:'',
			series: [
				{
					name: "Doanh Thu",
					data: [],
				},
			],
			options: {
				chart: {
					height: 350,
					type: "line",
					zoom: {
						enabled: false,
					},
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
				stroke: {
					curve: "straight",
				},
				
				title: {
					text: "Doanh thu tháng 6 ",
					align: "center",
					style: {
						fontSize:  '20px',
						fontWeight:  'bold',
						fontFamily:  undefined,
						color:  '#263238'
					},
			
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
		this.props.getHDStart();
		var month = new Date().getMonth()+1;
		var date = new Date(2022, month, 0);
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
			const monthTK = date.toISOString().slice(0, 7)
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 7) == monthTK
			})
			let day = [];
			let arrdataday = [];
			for (let index = 1; index <= date.getDate(); index++) {
				if (index < 10) {
					day = [...day, "0" + index];
				} else {
					day = [...day, index];
				}
				const arrDataDay = arr.filter((item) => {
					return item.ngayNhap.slice(8, 10) == day[index - 1];
				});

				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
			}
			this.setState({
				series: [
					{
						name: "Doanh Thu",
						data: arrdataday,
					},
				],
				options: {
					...this.state.options,
					xaxis: {
						categories: day,
					},
					title: {
						text: `Doanh thu tháng ${(date.getMonth()+1)}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize:  '20px',
							fontWeight:  'bold',
							fontFamily:  undefined,
							color:  '#263238'
						},
				
					},
				},
				ttDT: arrdataday
			});
		}
		if (prevState.dateTK !== this.state.dateTK) {
			var date = this.state.dateTK
			const monthTK = date.toISOString().slice(0, 7)
			const arr = this.state.arrHD.filter((item) => {
				return item.ngayNhap.slice(0, 7) == monthTK
			})
			let day = [];
			let arrdataday = [];
			for (let index = 1; index <= date.getDate(); index++) {
				if (index < 10) {
					day = [...day, "0" + index];
				} else {
					day = [...day, index];
				}
				const arrDataDay = arr.filter((item) => {
					return item.ngayNhap.slice(8, 10) == day[index - 1];
				});

				const dataday = arrDataDay?.reduce((acc, cur) => {
					return acc + cur.tongTien;
				}, 0);
				arrdataday = [...arrdataday, dataday];
			}
			this.setState({
				series: [
					{
						name: "Doanh Thu",
						data: arrdataday,
					},
				],
				options: {
					...this.state.options,
					xaxis: {
						categories: day,
					},
					title: {
						text: `Doanh thu tháng ${(date.getMonth()+1)}/${date.getFullYear()}`,
						align: "center",
						style: {
							fontSize:  '20px',
							fontWeight:  'bold',
							fontFamily:  undefined,
							color:  '#263238'
						},
				
					},
				},
				ttDT: arrdataday
			});
		}
	};
	handleOnChangeDateInput = (e)=>{
		var date = new Date(2022, e.target.value, 0);
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
			<div className="chuc-vu-container mb-5">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3 header-manage-user">
							<b>Thống kê doanh thu</b>
						</div>
						
						<div className="col-3"
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
									height: '40px',
									lineHeight: '40px',
									fontSize: "1.2rem",
									manageBottom: "0px !important",
									paddingBottom: "0px !important",
								}} 
							>
								{`Tổng doanh thu tháng :`} 
								<select
										value={m2.getMonth()+1}
										onChange={(e) => this.handleOnChangeDateInput(e)}
										style={{
											borderRadius: '5px',
											backgroundColor: '#53d9d0',
											width: '3rem',	
											marginLeft: '5px'
										}}
									>
										<option value={m.getMonth()+1}>
											{m.getMonth()+1}
										</option>
										<option value={m.getMonth()}>
											{m.getMonth()}
										</option>
										<option value={m.getMonth()-1}>
											{m.getMonth()-1}
										</option>
								</select>
							</label>
							<span className=""  
								style={{
									display: "block",
									height: '40px',
									lineHeight: '40px',
									fontWeight: 'bold',
									fontSize: "1.5rem",
									manageBottom: "0px !important",
									paddingBottom: "0px !important",
								}}
							>
								{
									formatter.format(this.state.ttDT?.reduce((acc, cur )=>{
										return acc + cur
									}, 0) || 0)
								}
							</span>
						</div>
						<div className="col-9">
							<div id="chart" className="mt-5">
								<Chart
									options={this.state.options}
									series={this.state.series}
									type="line"
									height={350}
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
						<ThongKeDTNam/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKe);
