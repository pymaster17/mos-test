// configure the test here
var TestConfig = {
  "TestName": "SMOS Test on LibriTTS test",
  "RateScalePng": "img/scale_abs.png",
  "RateScaleBgPng": "img/scale_abs_background.png",
  "RateMinValue": 0,
  "RateMaxValue": 5,
  "RateDefaultValue": 0,
  "ShowFileIDs": false,
  "ShowResults": true,
  "LoopByDefault": false,
  "EnableABLoop": true,
  "EnableOnlineSubmission": true,
  "BeaqleServiceURL": "/web_service/beaqleJS_Service.php",
  "SupervisorContact": "365270117@qq.com",
  "RandomizeTestOrder": true,
  "MaxTestsPerRun": 20,
  "RequireMaxRating": false,
  "AudioRoot": "",
  "Testsets": [
    {
      "Name": "ID-1:2277_149896_000006_000000",
      "TestID": "id1",
      "Files": {
        "Reference": "audio/vocos_mos_set/set1/2277_149896_000006_000000_gt.wav",
        "1": "audio/vocos_mos_set/set1/2277_149896_000006_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set1/2277_149896_000006_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set1/2277_149896_000006_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set1/2277_149896_000006_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-2:2277_149896_000007_000003",
      "TestID": "id2",
      "Files": {
        "Reference": "audio/vocos_mos_set/set2/2277_149896_000007_000003_gt.wav",
        "1": "audio/vocos_mos_set/set2/2277_149896_000007_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set2/2277_149896_000007_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set2/2277_149896_000007_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set2/2277_149896_000007_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-3:2277_149896_000023_000001",
      "TestID": "id3",
      "Files": {
        "Reference": "audio/vocos_mos_set/set3/2277_149896_000023_000001_gt.wav",
        "1": "audio/vocos_mos_set/set3/2277_149896_000023_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set3/2277_149896_000023_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set3/2277_149896_000023_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set3/2277_149896_000023_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-4:2277_149897_000022_000000",
      "TestID": "id4",
      "Files": {
        "Reference": "audio/vocos_mos_set/set4/2277_149897_000022_000000_gt.wav",
        "1": "audio/vocos_mos_set/set4/2277_149897_000022_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set4/2277_149897_000022_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set4/2277_149897_000022_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set4/2277_149897_000022_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-5:3170_137482_000022_000000",
      "TestID": "id5",
      "Files": {
        "Reference": "audio/vocos_mos_set/set5/3170_137482_000022_000000_gt.wav",
        "1": "audio/vocos_mos_set/set5/3170_137482_000022_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set5/3170_137482_000022_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set5/3170_137482_000022_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set5/3170_137482_000022_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-6:5895_34629_000046_000001",
      "TestID": "id6",
      "Files": {
        "Reference": "audio/vocos_mos_set/set6/5895_34629_000046_000001_gt.wav",
        "1": "audio/vocos_mos_set/set6/5895_34629_000046_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set6/5895_34629_000046_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set6/5895_34629_000046_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set6/5895_34629_000046_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-7:5694_64029_000008_000000",
      "TestID": "id7",
      "Files": {
        "Reference": "audio/vocos_mos_set/set7/5694_64029_000008_000000_gt.wav",
        "1": "audio/vocos_mos_set/set7/5694_64029_000008_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set7/5694_64029_000008_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set7/5694_64029_000008_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set7/5694_64029_000008_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-8:3170_137482_000013_000001",
      "TestID": "id8",
      "Files": {
        "Reference": "audio/vocos_mos_set/set8/3170_137482_000013_000001_gt.wav",
        "1": "audio/vocos_mos_set/set8/3170_137482_000013_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set8/3170_137482_000013_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set8/3170_137482_000013_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set8/3170_137482_000013_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-9:5694_64038_000018_000000",
      "TestID": "id9",
      "Files": {
        "Reference": "audio/vocos_mos_set/set9/5694_64038_000018_000000_gt.wav",
        "1": "audio/vocos_mos_set/set9/5694_64038_000018_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set9/5694_64038_000018_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set9/5694_64038_000018_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set9/5694_64038_000018_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-10:5694_64038_000004_000000",
      "TestID": "id10",
      "Files": {
        "Reference": "audio/vocos_mos_set/set10/5694_64038_000004_000000_gt.wav",
        "1": "audio/vocos_mos_set/set10/5694_64038_000004_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set10/5694_64038_000004_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set10/5694_64038_000004_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set10/5694_64038_000004_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-11:5694_64029_000002_000000",
      "TestID": "id11",
      "Files": {
        "Reference": "audio/vocos_mos_set/set11/5694_64029_000002_000000_gt.wav",
        "1": "audio/vocos_mos_set/set11/5694_64029_000002_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set11/5694_64029_000002_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set11/5694_64029_000002_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set11/5694_64029_000002_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-12:2277_149897_000030_000000",
      "TestID": "id12",
      "Files": {
        "Reference": "audio/vocos_mos_set/set12/2277_149897_000030_000000_gt.wav",
        "1": "audio/vocos_mos_set/set12/2277_149897_000030_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set12/2277_149897_000030_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set12/2277_149897_000030_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set12/2277_149897_000030_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-13:1919_142785_000063_000000",
      "TestID": "id13",
      "Files": {
        "Reference": "audio/vocos_mos_set/set13/1919_142785_000063_000000_gt.wav",
        "1": "audio/vocos_mos_set/set13/1919_142785_000063_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set13/1919_142785_000063_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set13/1919_142785_000063_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set13/1919_142785_000063_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-14:5895_34615_000019_000005",
      "TestID": "id14",
      "Files": {
        "Reference": "audio/vocos_mos_set/set14/5895_34615_000019_000005_gt.wav",
        "1": "audio/vocos_mos_set/set14/5895_34615_000019_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set14/5895_34615_000019_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set14/5895_34615_000019_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set14/5895_34615_000019_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-15:5694_64025_000022_000001",
      "TestID": "id15",
      "Files": {
        "Reference": "audio/vocos_mos_set/set15/5694_64025_000022_000001_gt.wav",
        "1": "audio/vocos_mos_set/set15/5694_64025_000022_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set15/5694_64025_000022_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set15/5694_64025_000022_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set15/5694_64025_000022_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-16:5895_34622_000024_000000",
      "TestID": "id16",
      "Files": {
        "Reference": "audio/vocos_mos_set/set16/5895_34622_000024_000000_gt.wav",
        "1": "audio/vocos_mos_set/set16/5895_34622_000024_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set16/5895_34622_000024_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set16/5895_34622_000024_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set16/5895_34622_000024_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-17:5895_34615_000013_000005",
      "TestID": "id17",
      "Files": {
        "Reference": "audio/vocos_mos_set/set17/5895_34615_000013_000005_gt.wav",
        "1": "audio/vocos_mos_set/set17/5895_34615_000013_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set17/5895_34615_000013_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set17/5895_34615_000013_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set17/5895_34615_000013_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-18:5895_34615_000027_000003",
      "TestID": "id18",
      "Files": {
        "Reference": "audio/vocos_mos_set/set18/5895_34615_000027_000003_gt.wav",
        "1": "audio/vocos_mos_set/set18/5895_34615_000027_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set18/5895_34615_000027_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set18/5895_34615_000027_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set18/5895_34615_000027_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-19:2277_149897_000031_000000",
      "TestID": "id19",
      "Files": {
        "Reference": "audio/vocos_mos_set/set19/2277_149897_000031_000000_gt.wav",
        "1": "audio/vocos_mos_set/set19/2277_149897_000031_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set19/2277_149897_000031_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set19/2277_149897_000031_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set19/2277_149897_000031_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-20:5694_64025_000009_000009",
      "TestID": "id20",
      "Files": {
        "Reference": "audio/vocos_mos_set/set20/5694_64025_000009_000009_gt.wav",
        "1": "audio/vocos_mos_set/set20/5694_64025_000009_000009_hifigan.wav",
        "2": "audio/vocos_mos_set/set20/5694_64025_000009_000009_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set20/5694_64025_000009_000009_vocos.wav",
        "4": "audio/vocos_mos_set/set20/5694_64025_000009_000009_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-21:3853_163249_000171_000000",
      "TestID": "id21",
      "Files": {
        "Reference": "audio/vocos_mos_set/set21/3853_163249_000171_000000_gt.wav",
        "1": "audio/vocos_mos_set/set21/3853_163249_000171_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set21/3853_163249_000171_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set21/3853_163249_000171_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set21/3853_163249_000171_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-22:2277_149896_000025_000008",
      "TestID": "id22",
      "Files": {
        "Reference": "audio/vocos_mos_set/set22/2277_149896_000025_000008_gt.wav",
        "1": "audio/vocos_mos_set/set22/2277_149896_000025_000008_hifigan.wav",
        "2": "audio/vocos_mos_set/set22/2277_149896_000025_000008_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set22/2277_149896_000025_000008_vocos.wav",
        "4": "audio/vocos_mos_set/set22/2277_149896_000025_000008_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-23:2277_149874_000026_000000",
      "TestID": "id23",
      "Files": {
        "Reference": "audio/vocos_mos_set/set23/2277_149874_000026_000000_gt.wav",
        "1": "audio/vocos_mos_set/set23/2277_149874_000026_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set23/2277_149874_000026_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set23/2277_149874_000026_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set23/2277_149874_000026_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-24:6295_64301_000007_000000",
      "TestID": "id24",
      "Files": {
        "Reference": "audio/vocos_mos_set/set24/6295_64301_000007_000000_gt.wav",
        "1": "audio/vocos_mos_set/set24/6295_64301_000007_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set24/6295_64301_000007_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set24/6295_64301_000007_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set24/6295_64301_000007_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-25:2277_149896_000009_000007",
      "TestID": "id25",
      "Files": {
        "Reference": "audio/vocos_mos_set/set25/2277_149896_000009_000007_gt.wav",
        "1": "audio/vocos_mos_set/set25/2277_149896_000009_000007_hifigan.wav",
        "2": "audio/vocos_mos_set/set25/2277_149896_000009_000007_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set25/2277_149896_000009_000007_vocos.wav",
        "4": "audio/vocos_mos_set/set25/2277_149896_000009_000007_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-26:1919_142785_000085_000001",
      "TestID": "id26",
      "Files": {
        "Reference": "audio/vocos_mos_set/set26/1919_142785_000085_000001_gt.wav",
        "1": "audio/vocos_mos_set/set26/1919_142785_000085_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set26/1919_142785_000085_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set26/1919_142785_000085_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set26/1919_142785_000085_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-27:3170_137482_000022_000002",
      "TestID": "id27",
      "Files": {
        "Reference": "audio/vocos_mos_set/set27/3170_137482_000022_000002_gt.wav",
        "1": "audio/vocos_mos_set/set27/3170_137482_000022_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set27/3170_137482_000022_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set27/3170_137482_000022_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set27/3170_137482_000022_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-28:2277_149874_000016_000000",
      "TestID": "id28",
      "Files": {
        "Reference": "audio/vocos_mos_set/set28/2277_149874_000016_000000_gt.wav",
        "1": "audio/vocos_mos_set/set28/2277_149874_000016_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set28/2277_149874_000016_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set28/2277_149874_000016_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set28/2277_149874_000016_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-29:5895_34615_000025_000000",
      "TestID": "id29",
      "Files": {
        "Reference": "audio/vocos_mos_set/set29/5895_34615_000025_000000_gt.wav",
        "1": "audio/vocos_mos_set/set29/5895_34615_000025_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set29/5895_34615_000025_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set29/5895_34615_000025_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set29/5895_34615_000025_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-30:2277_149897_000009_000000",
      "TestID": "id30",
      "Files": {
        "Reference": "audio/vocos_mos_set/set30/2277_149897_000009_000000_gt.wav",
        "1": "audio/vocos_mos_set/set30/2277_149897_000009_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set30/2277_149897_000009_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set30/2277_149897_000009_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set30/2277_149897_000009_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-31:5895_34622_000014_000000",
      "TestID": "id31",
      "Files": {
        "Reference": "audio/vocos_mos_set/set31/5895_34622_000014_000000_gt.wav",
        "1": "audio/vocos_mos_set/set31/5895_34622_000014_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set31/5895_34622_000014_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set31/5895_34622_000014_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set31/5895_34622_000014_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-32:5895_34629_000022_000001",
      "TestID": "id32",
      "Files": {
        "Reference": "audio/vocos_mos_set/set32/5895_34629_000022_000001_gt.wav",
        "1": "audio/vocos_mos_set/set32/5895_34629_000022_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set32/5895_34629_000022_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set32/5895_34629_000022_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set32/5895_34629_000022_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-33:2277_149896_000007_000008",
      "TestID": "id33",
      "Files": {
        "Reference": "audio/vocos_mos_set/set33/2277_149896_000007_000008_gt.wav",
        "1": "audio/vocos_mos_set/set33/2277_149896_000007_000008_hifigan.wav",
        "2": "audio/vocos_mos_set/set33/2277_149896_000007_000008_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set33/2277_149896_000007_000008_vocos.wav",
        "4": "audio/vocos_mos_set/set33/2277_149896_000007_000008_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-34:5694_64038_000024_000010",
      "TestID": "id34",
      "Files": {
        "Reference": "audio/vocos_mos_set/set34/5694_64038_000024_000010_gt.wav",
        "1": "audio/vocos_mos_set/set34/5694_64038_000024_000010_hifigan.wav",
        "2": "audio/vocos_mos_set/set34/5694_64038_000024_000010_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set34/5694_64038_000024_000010_vocos.wav",
        "4": "audio/vocos_mos_set/set34/5694_64038_000024_000010_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-35:5895_34622_000018_000005",
      "TestID": "id35",
      "Files": {
        "Reference": "audio/vocos_mos_set/set35/5895_34622_000018_000005_gt.wav",
        "1": "audio/vocos_mos_set/set35/5895_34622_000018_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set35/5895_34622_000018_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set35/5895_34622_000018_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set35/5895_34622_000018_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-36:2277_149896_000018_000001",
      "TestID": "id36",
      "Files": {
        "Reference": "audio/vocos_mos_set/set36/2277_149896_000018_000001_gt.wav",
        "1": "audio/vocos_mos_set/set36/2277_149896_000018_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set36/2277_149896_000018_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set36/2277_149896_000018_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set36/2277_149896_000018_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-37:1919_142785_000117_000000",
      "TestID": "id37",
      "Files": {
        "Reference": "audio/vocos_mos_set/set37/1919_142785_000117_000000_gt.wav",
        "1": "audio/vocos_mos_set/set37/1919_142785_000117_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set37/1919_142785_000117_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set37/1919_142785_000117_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set37/1919_142785_000117_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-38:3170_137482_000067_000006",
      "TestID": "id38",
      "Files": {
        "Reference": "audio/vocos_mos_set/set38/3170_137482_000067_000006_gt.wav",
        "1": "audio/vocos_mos_set/set38/3170_137482_000067_000006_hifigan.wav",
        "2": "audio/vocos_mos_set/set38/3170_137482_000067_000006_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set38/3170_137482_000067_000006_vocos.wav",
        "4": "audio/vocos_mos_set/set38/3170_137482_000067_000006_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-39:2277_149897_000040_000004",
      "TestID": "id39",
      "Files": {
        "Reference": "audio/vocos_mos_set/set39/2277_149897_000040_000004_gt.wav",
        "1": "audio/vocos_mos_set/set39/2277_149897_000040_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set39/2277_149897_000040_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set39/2277_149897_000040_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set39/2277_149897_000040_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-40:5895_34615_000022_000000",
      "TestID": "id40",
      "Files": {
        "Reference": "audio/vocos_mos_set/set40/5895_34615_000022_000000_gt.wav",
        "1": "audio/vocos_mos_set/set40/5895_34615_000022_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set40/5895_34615_000022_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set40/5895_34615_000022_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set40/5895_34615_000022_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-41:5694_64029_000006_000000",
      "TestID": "id41",
      "Files": {
        "Reference": "audio/vocos_mos_set/set41/5694_64029_000006_000000_gt.wav",
        "1": "audio/vocos_mos_set/set41/5694_64029_000006_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set41/5694_64029_000006_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set41/5694_64029_000006_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set41/5694_64029_000006_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-42:2277_149897_000005_000000",
      "TestID": "id42",
      "Files": {
        "Reference": "audio/vocos_mos_set/set42/2277_149897_000005_000000_gt.wav",
        "1": "audio/vocos_mos_set/set42/2277_149897_000005_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set42/2277_149897_000005_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set42/2277_149897_000005_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set42/2277_149897_000005_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-43:1919_142785_000089_000002",
      "TestID": "id43",
      "Files": {
        "Reference": "audio/vocos_mos_set/set43/1919_142785_000089_000002_gt.wav",
        "1": "audio/vocos_mos_set/set43/1919_142785_000089_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set43/1919_142785_000089_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set43/1919_142785_000089_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set43/1919_142785_000089_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-44:5694_64025_000019_000000",
      "TestID": "id44",
      "Files": {
        "Reference": "audio/vocos_mos_set/set44/5694_64025_000019_000000_gt.wav",
        "1": "audio/vocos_mos_set/set44/5694_64025_000019_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set44/5694_64025_000019_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set44/5694_64025_000019_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set44/5694_64025_000019_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-45:2277_149874_000005_000000",
      "TestID": "id45",
      "Files": {
        "Reference": "audio/vocos_mos_set/set45/2277_149874_000005_000000_gt.wav",
        "1": "audio/vocos_mos_set/set45/2277_149874_000005_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set45/2277_149874_000005_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set45/2277_149874_000005_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set45/2277_149874_000005_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-46:5694_64038_000015_000004",
      "TestID": "id46",
      "Files": {
        "Reference": "audio/vocos_mos_set/set46/5694_64038_000015_000004_gt.wav",
        "1": "audio/vocos_mos_set/set46/5694_64038_000015_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set46/5694_64038_000015_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set46/5694_64038_000015_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set46/5694_64038_000015_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-47:5895_34622_000017_000000",
      "TestID": "id47",
      "Files": {
        "Reference": "audio/vocos_mos_set/set47/5895_34622_000017_000000_gt.wav",
        "1": "audio/vocos_mos_set/set47/5895_34622_000017_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set47/5895_34622_000017_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set47/5895_34622_000017_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set47/5895_34622_000017_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-48:3170_137482_000018_000000",
      "TestID": "id48",
      "Files": {
        "Reference": "audio/vocos_mos_set/set48/3170_137482_000018_000000_gt.wav",
        "1": "audio/vocos_mos_set/set48/3170_137482_000018_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set48/3170_137482_000018_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set48/3170_137482_000018_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set48/3170_137482_000018_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-49:5895_34629_000034_000000",
      "TestID": "id49",
      "Files": {
        "Reference": "audio/vocos_mos_set/set49/5895_34629_000034_000000_gt.wav",
        "1": "audio/vocos_mos_set/set49/5895_34629_000034_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set49/5895_34629_000034_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set49/5895_34629_000034_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set49/5895_34629_000034_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-50:5694_64025_000007_000000",
      "TestID": "id50",
      "Files": {
        "Reference": "audio/vocos_mos_set/set50/5694_64025_000007_000000_gt.wav",
        "1": "audio/vocos_mos_set/set50/5694_64025_000007_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set50/5694_64025_000007_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set50/5694_64025_000007_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set50/5694_64025_000007_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-51:5694_64038_000005_000000",
      "TestID": "id51",
      "Files": {
        "Reference": "audio/vocos_mos_set/set51/5694_64038_000005_000000_gt.wav",
        "1": "audio/vocos_mos_set/set51/5694_64038_000005_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set51/5694_64038_000005_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set51/5694_64038_000005_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set51/5694_64038_000005_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-52:5694_64038_000017_000005",
      "TestID": "id52",
      "Files": {
        "Reference": "audio/vocos_mos_set/set52/5694_64038_000017_000005_gt.wav",
        "1": "audio/vocos_mos_set/set52/5694_64038_000017_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set52/5694_64038_000017_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set52/5694_64038_000017_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set52/5694_64038_000017_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-53:5694_64038_000015_000010",
      "TestID": "id53",
      "Files": {
        "Reference": "audio/vocos_mos_set/set53/5694_64038_000015_000010_gt.wav",
        "1": "audio/vocos_mos_set/set53/5694_64038_000015_000010_hifigan.wav",
        "2": "audio/vocos_mos_set/set53/5694_64038_000015_000010_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set53/5694_64038_000015_000010_vocos.wav",
        "4": "audio/vocos_mos_set/set53/5694_64038_000015_000010_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-54:2277_149897_000020_000000",
      "TestID": "id54",
      "Files": {
        "Reference": "audio/vocos_mos_set/set54/2277_149897_000020_000000_gt.wav",
        "1": "audio/vocos_mos_set/set54/2277_149897_000020_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set54/2277_149897_000020_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set54/2277_149897_000020_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set54/2277_149897_000020_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-55:2277_149896_000025_000002",
      "TestID": "id55",
      "Files": {
        "Reference": "audio/vocos_mos_set/set55/2277_149896_000025_000002_gt.wav",
        "1": "audio/vocos_mos_set/set55/2277_149896_000025_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set55/2277_149896_000025_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set55/2277_149896_000025_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set55/2277_149896_000025_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-56:5895_34615_000021_000001",
      "TestID": "id56",
      "Files": {
        "Reference": "audio/vocos_mos_set/set56/5895_34615_000021_000001_gt.wav",
        "1": "audio/vocos_mos_set/set56/5895_34615_000021_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set56/5895_34615_000021_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set56/5895_34615_000021_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set56/5895_34615_000021_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-57:2277_149897_000037_000001",
      "TestID": "id57",
      "Files": {
        "Reference": "audio/vocos_mos_set/set57/2277_149897_000037_000001_gt.wav",
        "1": "audio/vocos_mos_set/set57/2277_149897_000037_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set57/2277_149897_000037_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set57/2277_149897_000037_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set57/2277_149897_000037_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-58:1919_142785_000064_000001",
      "TestID": "id58",
      "Files": {
        "Reference": "audio/vocos_mos_set/set58/1919_142785_000064_000001_gt.wav",
        "1": "audio/vocos_mos_set/set58/1919_142785_000064_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set58/1919_142785_000064_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set58/1919_142785_000064_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set58/1919_142785_000064_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-59:1919_142785_000048_000000",
      "TestID": "id59",
      "Files": {
        "Reference": "audio/vocos_mos_set/set59/1919_142785_000048_000000_gt.wav",
        "1": "audio/vocos_mos_set/set59/1919_142785_000048_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set59/1919_142785_000048_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set59/1919_142785_000048_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set59/1919_142785_000048_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-60:5694_64038_000012_000000",
      "TestID": "id60",
      "Files": {
        "Reference": "audio/vocos_mos_set/set60/5694_64038_000012_000000_gt.wav",
        "1": "audio/vocos_mos_set/set60/5694_64038_000012_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set60/5694_64038_000012_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set60/5694_64038_000012_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set60/5694_64038_000012_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-61:2277_149897_000020_000005",
      "TestID": "id61",
      "Files": {
        "Reference": "audio/vocos_mos_set/set61/2277_149897_000020_000005_gt.wav",
        "1": "audio/vocos_mos_set/set61/2277_149897_000020_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set61/2277_149897_000020_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set61/2277_149897_000020_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set61/2277_149897_000020_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-62:1919_142785_000031_000001",
      "TestID": "id62",
      "Files": {
        "Reference": "audio/vocos_mos_set/set62/1919_142785_000031_000001_gt.wav",
        "1": "audio/vocos_mos_set/set62/1919_142785_000031_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set62/1919_142785_000031_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set62/1919_142785_000031_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set62/1919_142785_000031_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-63:5895_34615_000019_000006",
      "TestID": "id63",
      "Files": {
        "Reference": "audio/vocos_mos_set/set63/5895_34615_000019_000006_gt.wav",
        "1": "audio/vocos_mos_set/set63/5895_34615_000019_000006_hifigan.wav",
        "2": "audio/vocos_mos_set/set63/5895_34615_000019_000006_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set63/5895_34615_000019_000006_vocos.wav",
        "4": "audio/vocos_mos_set/set63/5895_34615_000019_000006_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-64:5694_64038_000018_000001",
      "TestID": "id64",
      "Files": {
        "Reference": "audio/vocos_mos_set/set64/5694_64038_000018_000001_gt.wav",
        "1": "audio/vocos_mos_set/set64/5694_64038_000018_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set64/5694_64038_000018_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set64/5694_64038_000018_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set64/5694_64038_000018_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-65:3853_163249_000107_000000",
      "TestID": "id65",
      "Files": {
        "Reference": "audio/vocos_mos_set/set65/3853_163249_000107_000000_gt.wav",
        "1": "audio/vocos_mos_set/set65/3853_163249_000107_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set65/3853_163249_000107_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set65/3853_163249_000107_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set65/3853_163249_000107_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-66:5694_64029_000005_000003",
      "TestID": "id66",
      "Files": {
        "Reference": "audio/vocos_mos_set/set66/5694_64029_000005_000003_gt.wav",
        "1": "audio/vocos_mos_set/set66/5694_64029_000005_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set66/5694_64029_000005_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set66/5694_64029_000005_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set66/5694_64029_000005_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-67:5895_34615_000015_000001",
      "TestID": "id67",
      "Files": {
        "Reference": "audio/vocos_mos_set/set67/5895_34615_000015_000001_gt.wav",
        "1": "audio/vocos_mos_set/set67/5895_34615_000015_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set67/5895_34615_000015_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set67/5895_34615_000015_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set67/5895_34615_000015_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-68:5694_64029_000004_000000",
      "TestID": "id68",
      "Files": {
        "Reference": "audio/vocos_mos_set/set68/5694_64029_000004_000000_gt.wav",
        "1": "audio/vocos_mos_set/set68/5694_64029_000004_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set68/5694_64029_000004_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set68/5694_64029_000004_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set68/5694_64029_000004_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-69:5694_64029_000031_000003",
      "TestID": "id69",
      "Files": {
        "Reference": "audio/vocos_mos_set/set69/5694_64029_000031_000003_gt.wav",
        "1": "audio/vocos_mos_set/set69/5694_64029_000031_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set69/5694_64029_000031_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set69/5694_64029_000031_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set69/5694_64029_000031_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-70:3170_137482_000067_000000",
      "TestID": "id70",
      "Files": {
        "Reference": "audio/vocos_mos_set/set70/3170_137482_000067_000000_gt.wav",
        "1": "audio/vocos_mos_set/set70/3170_137482_000067_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set70/3170_137482_000067_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set70/3170_137482_000067_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set70/3170_137482_000067_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-71:5694_64029_000028_000000",
      "TestID": "id71",
      "Files": {
        "Reference": "audio/vocos_mos_set/set71/5694_64029_000028_000000_gt.wav",
        "1": "audio/vocos_mos_set/set71/5694_64029_000028_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set71/5694_64029_000028_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set71/5694_64029_000028_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set71/5694_64029_000028_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-72:5895_34622_000019_000000",
      "TestID": "id72",
      "Files": {
        "Reference": "audio/vocos_mos_set/set72/5895_34622_000019_000000_gt.wav",
        "1": "audio/vocos_mos_set/set72/5895_34622_000019_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set72/5895_34622_000019_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set72/5895_34622_000019_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set72/5895_34622_000019_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-73:6295_64301_000007_000001",
      "TestID": "id73",
      "Files": {
        "Reference": "audio/vocos_mos_set/set73/6295_64301_000007_000001_gt.wav",
        "1": "audio/vocos_mos_set/set73/6295_64301_000007_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set73/6295_64301_000007_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set73/6295_64301_000007_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set73/6295_64301_000007_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-74:5895_34622_000026_000004",
      "TestID": "id74",
      "Files": {
        "Reference": "audio/vocos_mos_set/set74/5895_34622_000026_000004_gt.wav",
        "1": "audio/vocos_mos_set/set74/5895_34622_000026_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set74/5895_34622_000026_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set74/5895_34622_000026_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set74/5895_34622_000026_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-75:5694_64029_000016_000002",
      "TestID": "id75",
      "Files": {
        "Reference": "audio/vocos_mos_set/set75/5694_64029_000016_000002_gt.wav",
        "1": "audio/vocos_mos_set/set75/5694_64029_000016_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set75/5694_64029_000016_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set75/5694_64029_000016_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set75/5694_64029_000016_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-76:2277_149896_000006_000001",
      "TestID": "id76",
      "Files": {
        "Reference": "audio/vocos_mos_set/set76/2277_149896_000006_000001_gt.wav",
        "1": "audio/vocos_mos_set/set76/2277_149896_000006_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set76/2277_149896_000006_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set76/2277_149896_000006_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set76/2277_149896_000006_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-77:3853_163249_000112_000002",
      "TestID": "id77",
      "Files": {
        "Reference": "audio/vocos_mos_set/set77/3853_163249_000112_000002_gt.wav",
        "1": "audio/vocos_mos_set/set77/3853_163249_000112_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set77/3853_163249_000112_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set77/3853_163249_000112_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set77/3853_163249_000112_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-78:5895_34629_000006_000001",
      "TestID": "id78",
      "Files": {
        "Reference": "audio/vocos_mos_set/set78/5895_34629_000006_000001_gt.wav",
        "1": "audio/vocos_mos_set/set78/5895_34629_000006_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set78/5895_34629_000006_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set78/5895_34629_000006_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set78/5895_34629_000006_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-79:5895_34615_000017_000003",
      "TestID": "id79",
      "Files": {
        "Reference": "audio/vocos_mos_set/set79/5895_34615_000017_000003_gt.wav",
        "1": "audio/vocos_mos_set/set79/5895_34615_000017_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set79/5895_34615_000017_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set79/5895_34615_000017_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set79/5895_34615_000017_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-80:2277_149897_000040_000001",
      "TestID": "id80",
      "Files": {
        "Reference": "audio/vocos_mos_set/set80/2277_149897_000040_000001_gt.wav",
        "1": "audio/vocos_mos_set/set80/2277_149897_000040_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set80/2277_149897_000040_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set80/2277_149897_000040_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set80/2277_149897_000040_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-81:1462_170138_000023_000004",
      "TestID": "id81",
      "Files": {
        "Reference": "audio/vocos_mos_set/set81/1462_170138_000023_000004_gt.wav",
        "1": "audio/vocos_mos_set/set81/1462_170138_000023_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set81/1462_170138_000023_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set81/1462_170138_000023_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set81/1462_170138_000023_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-82:1919_142785_000135_000001",
      "TestID": "id82",
      "Files": {
        "Reference": "audio/vocos_mos_set/set82/1919_142785_000135_000001_gt.wav",
        "1": "audio/vocos_mos_set/set82/1919_142785_000135_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set82/1919_142785_000135_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set82/1919_142785_000135_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set82/1919_142785_000135_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-83:2277_149897_000037_000000",
      "TestID": "id83",
      "Files": {
        "Reference": "audio/vocos_mos_set/set83/2277_149897_000037_000000_gt.wav",
        "1": "audio/vocos_mos_set/set83/2277_149897_000037_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set83/2277_149897_000037_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set83/2277_149897_000037_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set83/2277_149897_000037_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-84:5694_64038_000015_000001",
      "TestID": "id84",
      "Files": {
        "Reference": "audio/vocos_mos_set/set84/5694_64038_000015_000001_gt.wav",
        "1": "audio/vocos_mos_set/set84/5694_64038_000015_000001_hifigan.wav",
        "2": "audio/vocos_mos_set/set84/5694_64038_000015_000001_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set84/5694_64038_000015_000001_vocos.wav",
        "4": "audio/vocos_mos_set/set84/5694_64038_000015_000001_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-85:5895_34615_000026_000002",
      "TestID": "id85",
      "Files": {
        "Reference": "audio/vocos_mos_set/set85/5895_34615_000026_000002_gt.wav",
        "1": "audio/vocos_mos_set/set85/5895_34615_000026_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set85/5895_34615_000026_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set85/5895_34615_000026_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set85/5895_34615_000026_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-86:5694_64038_000015_000011",
      "TestID": "id86",
      "Files": {
        "Reference": "audio/vocos_mos_set/set86/5694_64038_000015_000011_gt.wav",
        "1": "audio/vocos_mos_set/set86/5694_64038_000015_000011_hifigan.wav",
        "2": "audio/vocos_mos_set/set86/5694_64038_000015_000011_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set86/5694_64038_000015_000011_vocos.wav",
        "4": "audio/vocos_mos_set/set86/5694_64038_000015_000011_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-87:5694_64038_000024_000025",
      "TestID": "id87",
      "Files": {
        "Reference": "audio/vocos_mos_set/set87/5694_64038_000024_000025_gt.wav",
        "1": "audio/vocos_mos_set/set87/5694_64038_000024_000025_hifigan.wav",
        "2": "audio/vocos_mos_set/set87/5694_64038_000024_000025_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set87/5694_64038_000024_000025_vocos.wav",
        "4": "audio/vocos_mos_set/set87/5694_64038_000024_000025_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-88:2277_149874_000030_000007",
      "TestID": "id88",
      "Files": {
        "Reference": "audio/vocos_mos_set/set88/2277_149874_000030_000007_gt.wav",
        "1": "audio/vocos_mos_set/set88/2277_149874_000030_000007_hifigan.wav",
        "2": "audio/vocos_mos_set/set88/2277_149874_000030_000007_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set88/2277_149874_000030_000007_vocos.wav",
        "4": "audio/vocos_mos_set/set88/2277_149874_000030_000007_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-89:5694_64029_000013_000000",
      "TestID": "id89",
      "Files": {
        "Reference": "audio/vocos_mos_set/set89/5694_64029_000013_000000_gt.wav",
        "1": "audio/vocos_mos_set/set89/5694_64029_000013_000000_hifigan.wav",
        "2": "audio/vocos_mos_set/set89/5694_64029_000013_000000_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set89/5694_64029_000013_000000_vocos.wav",
        "4": "audio/vocos_mos_set/set89/5694_64029_000013_000000_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-90:2277_149896_000003_000006",
      "TestID": "id90",
      "Files": {
        "Reference": "audio/vocos_mos_set/set90/2277_149896_000003_000006_gt.wav",
        "1": "audio/vocos_mos_set/set90/2277_149896_000003_000006_hifigan.wav",
        "2": "audio/vocos_mos_set/set90/2277_149896_000003_000006_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set90/2277_149896_000003_000006_vocos.wav",
        "4": "audio/vocos_mos_set/set90/2277_149896_000003_000006_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-91:5694_64038_000024_000015",
      "TestID": "id91",
      "Files": {
        "Reference": "audio/vocos_mos_set/set91/5694_64038_000024_000015_gt.wav",
        "1": "audio/vocos_mos_set/set91/5694_64038_000024_000015_hifigan.wav",
        "2": "audio/vocos_mos_set/set91/5694_64038_000024_000015_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set91/5694_64038_000024_000015_vocos.wav",
        "4": "audio/vocos_mos_set/set91/5694_64038_000024_000015_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-92:5694_64029_000016_000005",
      "TestID": "id92",
      "Files": {
        "Reference": "audio/vocos_mos_set/set92/5694_64029_000016_000005_gt.wav",
        "1": "audio/vocos_mos_set/set92/5694_64029_000016_000005_hifigan.wav",
        "2": "audio/vocos_mos_set/set92/5694_64029_000016_000005_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set92/5694_64029_000016_000005_vocos.wav",
        "4": "audio/vocos_mos_set/set92/5694_64029_000016_000005_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-93:5694_64038_000017_000003",
      "TestID": "id93",
      "Files": {
        "Reference": "audio/vocos_mos_set/set93/5694_64038_000017_000003_gt.wav",
        "1": "audio/vocos_mos_set/set93/5694_64038_000017_000003_hifigan.wav",
        "2": "audio/vocos_mos_set/set93/5694_64038_000017_000003_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set93/5694_64038_000017_000003_vocos.wav",
        "4": "audio/vocos_mos_set/set93/5694_64038_000017_000003_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-94:5895_34615_000023_000004",
      "TestID": "id94",
      "Files": {
        "Reference": "audio/vocos_mos_set/set94/5895_34615_000023_000004_gt.wav",
        "1": "audio/vocos_mos_set/set94/5895_34615_000023_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set94/5895_34615_000023_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set94/5895_34615_000023_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set94/5895_34615_000023_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-95:5895_34622_000031_000002",
      "TestID": "id95",
      "Files": {
        "Reference": "audio/vocos_mos_set/set95/5895_34622_000031_000002_gt.wav",
        "1": "audio/vocos_mos_set/set95/5895_34622_000031_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set95/5895_34622_000031_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set95/5895_34622_000031_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set95/5895_34622_000031_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-96:5694_64029_000030_000006",
      "TestID": "id96",
      "Files": {
        "Reference": "audio/vocos_mos_set/set96/5694_64029_000030_000006_gt.wav",
        "1": "audio/vocos_mos_set/set96/5694_64029_000030_000006_hifigan.wav",
        "2": "audio/vocos_mos_set/set96/5694_64029_000030_000006_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set96/5694_64029_000030_000006_vocos.wav",
        "4": "audio/vocos_mos_set/set96/5694_64029_000030_000006_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-97:5694_64029_000027_000004",
      "TestID": "id97",
      "Files": {
        "Reference": "audio/vocos_mos_set/set97/5694_64029_000027_000004_gt.wav",
        "1": "audio/vocos_mos_set/set97/5694_64029_000027_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set97/5694_64029_000027_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set97/5694_64029_000027_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set97/5694_64029_000027_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-98:2277_149897_000035_000004",
      "TestID": "id98",
      "Files": {
        "Reference": "audio/vocos_mos_set/set98/2277_149897_000035_000004_gt.wav",
        "1": "audio/vocos_mos_set/set98/2277_149897_000035_000004_hifigan.wav",
        "2": "audio/vocos_mos_set/set98/2277_149897_000035_000004_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set98/2277_149897_000035_000004_vocos.wav",
        "4": "audio/vocos_mos_set/set98/2277_149897_000035_000004_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-99:5895_34615_000021_000002",
      "TestID": "id99",
      "Files": {
        "Reference": "audio/vocos_mos_set/set99/5895_34615_000021_000002_gt.wav",
        "1": "audio/vocos_mos_set/set99/5895_34615_000021_000002_hifigan.wav",
        "2": "audio/vocos_mos_set/set99/5895_34615_000021_000002_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set99/5895_34615_000021_000002_vocos.wav",
        "4": "audio/vocos_mos_set/set99/5895_34615_000021_000002_gt.wav"
      },
      "transcribe": ""
    },
    {
      "Name": "ID-100:2277_149897_000020_000008",
      "TestID": "id100",
      "Files": {
        "Reference": "audio/vocos_mos_set/set100/2277_149897_000020_000008_gt.wav",
        "1": "audio/vocos_mos_set/set100/2277_149897_000020_000008_hifigan.wav",
        "2": "audio/vocos_mos_set/set100/2277_149897_000020_000008_SpikingVocos.wav",
        "3": "audio/vocos_mos_set/set100/2277_149897_000020_000008_vocos.wav",
        "4": "audio/vocos_mos_set/set100/2277_149897_000020_000008_gt.wav"
      },
      "transcribe": ""
    }
  ]
}