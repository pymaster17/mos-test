// configure the test here
var TestConfig = {
  "TestName": "Mushra Test on out-distributed Chinese Madirian AISHELL3 test",
  "RateScalePng": "img/scale_abs.png",
  "RateScaleBgPng": "img/scale_abs_background.png",
  "RateMinValue": 0,
  "RateMaxValue": 5,
  "RateDefaultValue": 0,
  "ShowFileIDs": false,
  "ShowResults": true,
  "LoopByDefault": false,
  "EnableABLoop": true,
  "EnableOnlineSubmission": false,
  "BeaqleServiceURL": "/web_service/beaqleJS_Service.php",
  "SupervisorContact": "liandong@mail.ioa.ac.cn",
  "RandomizeTestOrder": true,
  "MaxTestsPerRun": -1,
  "RequireMaxRating": false,
  "AudioRoot": "",
  "Testsets": [
    //    
    {
      "Name": "ID-1:SSB07020452",
      "TestID": "id1",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set1/SSB07020452.wav",
            "1": "audio/aishell3_test_mushra/set1/SSB07020452_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set1/SSB07020452_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set1/SSB07020452_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set1/SSB07020452_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set1/SSB07020452_vocos.wav",
            "6": "audio/aishell3_test_mushra/set1/SSB07020452_wavefm.wav",
        },
        "transcribe": "目前中关村大街沿线写字楼共计36座。"
    },
    {
      "Name": "ID-2:SSB07160166",
      "TestID": "id2",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set2/SSB07160166.wav",
            "1": "audio/aishell3_test_mushra/set2/SSB07160166_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set2/SSB07160166_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set2/SSB07160166_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set2/SSB07160166_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set2/SSB07160166_vocos.wav",
            "6": "audio/aishell3_test_mushra/set2/SSB07160166_wavefm.wav",
        },
        "transcribe": "有没有童话？"
    },
    {
      "Name": "ID-3:SSB09930324",
      "TestID": "id3",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set3/SSB09930324.wav",
            "1": "audio/aishell3_test_mushra/set3/SSB09930324_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set3/SSB09930324_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set3/SSB09930324_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set3/SSB09930324_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set3/SSB09930324_vocos.wav",
            "6": "audio/aishell3_test_mushra/set3/SSB09930324_wavefm.wav",
        },
        "transcribe": "畅达煤业有限公司。"
    },
    //    
    {
      "Name": "ID-4:SSB09970463",
      "TestID": "id4",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set4/SSB09970463.wav",
            "1": "audio/aishell3_test_mushra/set4/SSB09970463_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set4/SSB09970463_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set4/SSB09970463_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set4/SSB09970463_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set4/SSB09970463_vocos.wav",
            "6": "audio/aishell3_test_mushra/set4/SSB09970463_wavefm.wav",
        },
        "transcribe": "一份选举宣言就是最终棚定某一政党的权利到底在哪？"
    },
    //
    {
      "Name": "ID-5:SSB11350416",
      "TestID": "id5",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set5/SSB11350416.wav",
            "1": "audio/aishell3_test_mushra/set5/SSB11350416_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set5/SSB11350416_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set5/SSB11350416_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set5/SSB11350416_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set5/SSB11350416_vocos.wav",
            "6": "audio/aishell3_test_mushra/set5/SSB11350416_wavefm.wav",
        },
        "transcribe": "对于现役的国家队球员来说。"
   },
   //
   {
    "Name": "ID-6:SSB12390044",
      "TestID": "id6",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set6/SSB12390044.wav",
            "1": "audio/aishell3_test_mushra/set6/SSB12390044_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set6/SSB12390044_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set6/SSB12390044_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set6/SSB12390044_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set6/SSB12390044_vocos.wav",
            "6": "audio/aishell3_test_mushra/set6/SSB12390044_wavefm.wav",
        },
        "transcribe": " 一旦中招则意味着需四处举债。"
 },
 //
 {
  "Name": "ID-7:SSB12740201",
      "TestID": "id7",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set7/SSB12740201.wav",
            "1": "audio/aishell3_test_mushra/set7/SSB12740201_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set7/SSB12740201_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set7/SSB12740201_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set7/SSB12740201_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set7/SSB12740201_vocos.wav",
            "6": "audio/aishell3_test_mushra/set7/SSB12740201_wavefm.wav",
        },
        "transcribe": "日本的大将有什么？"
},
//
{
  "Name": "ID-8:SSB12740310",
      "TestID": "id8",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set8/SSB12740310.wav",
            "1": "audio/aishell3_test_mushra/set8/SSB12740310_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set8/SSB12740310_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set8/SSB12740310_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set8/SSB12740310_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set8/SSB12740310_vocos.wav",
            "6": "audio/aishell3_test_mushra/set8/SSB12740310_wavefm.wav",
        },
        "transcribe": "宁波的乡镇有什么？"
},
//
{
  "Name": "ID-9:SSB13820450",
      "TestID": "id9",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set9/SSB13820450.wav",
            "1": "audio/aishell3_test_mushra/set9/SSB13820450_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set9/SSB13820450_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set9/SSB13820450_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set9/SSB13820450_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set9/SSB13820450_vocos.wav",
            "6": "audio/aishell3_test_mushra/set9/SSB13820450_wavefm.wav",
        },
        "transcribe": "比利时的建筑有什么？"
},
//
{
  "Name": "ID-10:SSB14370138",
      "TestID": "id10",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set10/SSB14370138.wav",
            "1": "audio/aishell3_test_mushra/set10/SSB14370138_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set10/SSB14370138_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set10/SSB14370138_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set10/SSB14370138_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set10/SSB14370138_vocos.wav",
            "6": "audio/aishell3_test_mushra/set10/SSB14370138_wavefm.wav",
        },
        "transcribe": "chuan 1 jiang 3 tan 2 jian 4 san 1 zhi 2 li 3 两头犯规。"
},
//
{
  "Name": "ID-11:SSB15930049",
      "TestID": "id11",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set11/SSB15930049.wav",
            "1": "audio/aishell3_test_mushra/set11/SSB15930049_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set11/SSB15930049_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set11/SSB15930049_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set11/SSB15930049_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set11/SSB15930049_vocos.wav",
            "6": "audio/aishell3_test_mushra/set11/SSB15930049_wavefm.wav",
        },
        "transcribe": "开门红。"
},
//
{
  "Name": "ID-12:SSB17280042",
      "TestID": "id12",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set12/SSB17280042.wav",
            "1": "audio/aishell3_test_mushra/set12/SSB17280042_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set12/SSB17280042_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set12/SSB17280042_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set12/SSB17280042_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set12/SSB17280042_vocos.wav",
            "6": "audio/aishell3_test_mushra/set12/SSB17280042_wavefm.wav",
        },
        "transcribe": "这意味着一周内就完成一百亿元的募资。"
},
//
{
  "Name": "ID-13:SSB17280177",
      "TestID": "id13",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set13/SSB17280177.wav",
            "1": "audio/aishell3_test_mushra/set13/SSB17280177_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set13/SSB17280177_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set13/SSB17280177_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set13/SSB17280177_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set13/SSB17280177_vocos.wav",
            "6": "audio/aishell3_test_mushra/set13/SSB17280177_wavefm.wav",
        },
        "transcribe": "不但没嫁出去。"
},
//
{
  "Name": "ID-14:SSB17280449",
      "TestID": "id14",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set14/SSB17280449.wav",
            "1": "audio/aishell3_test_mushra/set14/SSB17280449_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set14/SSB17280449_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set14/SSB17280449_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set14/SSB17280449_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set14/SSB17280449_vocos.wav",
            "6": "audio/aishell3_test_mushra/set14/SSB17280449_wavefm.wav",
        },
        "transcribe": "jin 1 dao 3 娱乐城。"
},
//
{
  "Name": "ID-15:SSB18910255",
      "TestID": "id15",
      "Files": {
            "Reference": "audio/aishell3_test_mushra/set15/SSB18910255.wav",
            "1": "audio/aishell3_test_mushra/set15/SSB18910255_bigvgan.wav",
            "2": "audio/aishell3_test_mushra/set15/SSB18910255_cfvoc.wav",
            "3": "audio/aishell3_test_mushra/set15/SSB18910255_hifigan.wav",
            "4": "audio/aishell3_test_mushra/set15/SSB18910255_rfwave.wav",
            "5": "audio/aishell3_test_mushra/set15/SSB18910255_vocos.wav",
            "6": "audio/aishell3_test_mushra/set15/SSB18910255_wavefm.wav",
        },
        "transcribe": "拥抱太阳的月亮的tong 2 xing 1 有什么。"
},

  ]
}
