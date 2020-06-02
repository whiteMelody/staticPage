'use strict';

/**
 * 投注枚举
 */

var LotType = {
    '胜平负': 0,
    '让球胜平负': 1,
    '比分': 2,
    '进球数': 3
};

var LotType1 = {
    '胜': 0,
    '平': 1,
    '负': 2

    /// <summary>
    /// 比分
    /// </summary>
    //
    // {
    //     [Description("1:0")]
    //     s_1_0 = 0,
    //         [Description("2:0")]
    //     s_2_0 = 1,
    //         [Description("2:1")]
    //     s_2_1 = 2,
    //         [Description("3:0")]
    //     s_3_0 = 3,
    //         [Description("3:1")]
    //     s_3_1 = 4,
    //         [Description("3:2")]
    //     s_3_2 = 5,
    //         [Description("4:0")]
    //     s_4_0 = 6,
    //         [Description("4:1")]
    //     s_4_1 = 7,
    //         [Description("4:2")]
    //     s_4_2 = 8,
    //         [Description("5:0")]
    //     s_5_0 = 9,
    //         [Description("5:1")]
    //     s_5_1 = 10,
    //         [Description("5:2")]
    //     s_5_2 = 11,
    //         [Description("胜其它")]
    //     s_other = 12,
    //         [Description("0:0")]
    //     p_0_0 = 13,
    //         [Description("1:1")]
    //     p_1_1 = 14,
    //         [Description("2:2")]
    //     p_2_2 = 15,
    //         [Description("3:3")]
    //     p_3_3 = 16,
    //         [Description("平其它")]
    //     p_other = 17,
    //         [Description("0:1")]
    //     f_0_1 = 18,
    //         [Description("0:2")]
    //     f_0_2 = 19,
    //         [Description("1:2")]
    //     f_1_2 = 20,
    //         [Description("0:3")]
    //     f_0_3 = 21,
    //         [Description("1:3")]
    //     f_1_3 = 22,
    //         [Description("2:3")]
    //     f_2_3 = 23,
    //         [Description("0:4")]
    //     f_0_4 = 24,
    //         [Description("1:4")]
    //     f_1_4 = 25,
    //         [Description("2:4")]
    //     f_2_4 = 26,
    //         [Description("0:5")]
    //     f_0_5 = 27,
    //         [Description("1:5")]
    //     f_1_5 = 28,
    //         [Description("2:5")]
    //     f_2_5 = 29,
    //         [Description("负其它")]
    //     f_other = 30
    // }


    //
    // /// <summary>
    // /// 总进球数
    // /// </summary>
    // public enum LotType_Goals
    // {
    //     /// <summary>
    //     /// 进0球
    //     /// </summary>
    //     [Description("进0球")]
    //     total0 = 0,
    //         /// <summary>
    //         /// 进1球
    //         /// </summary>
    //         [Description("进1球")]
    //     total1 = 1,
    //         /// <summary>
    //         /// 进2球
    //         /// </summary>
    //         [Description("进2球")]
    //     total2 = 2,
    //         /// <summary>
    //         /// 进3球
    //         /// </summary>
    //         [Description("进3球")]
    //     total3 = 3,
    //         /// <summary>
    //         /// 进4球
    //         /// </summary>
    //         [Description("进4球")]
    //     total4 = 4,
    //         /// <summary>
    //         /// 进5球
    //         /// </summary>
    //         [Description("进5球")]
    //     total5 = 5,
    //         /// <summary>
    //         /// 进7球
    //         /// </summary>
    //         [Description("进7球")]
    //     total6 = 6,
    //         /// <summary>
    //         /// 进7+球
    //         /// </summary>
    //         [Description("进7+球")]
    //     total7 = 7
    // }
};