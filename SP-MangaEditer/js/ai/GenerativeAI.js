var firstSDConnection = true;
var firstComfyConnection = true;

function T2I( layer, spinner ){
  if (API_mode == apis.A1111) {
    sdwebui_T2IProcessQueue(layer, spinner.id);
  }else if (API_mode == apis.COMFYUI){
    Comfyui_handle_process_queue(layer, spinner.id);
  }
}
function I2I( layer, spinner ){
  if (API_mode == apis.A1111) {
    sdwebui_I2IProcessQueue(layer, spinner.id);
  }else if (API_mode == apis.COMFYUI){
    var isI2I = false;
    Comfyui_handle_process_queue(layer, spinner.id, isI2I);
  }
}

  


function getDiffusionInfomation() {
  if (API_mode == apis.A1111) {
    fetchSD_Models();
    fetchSD_Sampler();
    fetchSD_Upscaler();
    fetchSD_ADModels();
  }else if( API_mode == apis.COMFYUI ){
    Comfyui_FetchModels();
    Comfyui_FetchSampler();
    Comfyui_FetchUpscaler();
  }
}


function apiHeartbeat(){
  const pingCheck = $('apiHeartbeatCheckbox');
  if (pingCheck.checked) {
  } else {
    return;
  }

  if (API_mode == apis.A1111) {
    sdwebui_apiHeartbeat();
  }else if( API_mode == apis.COMFYUI ){
    Comfyui_apiHeartbeat();
  }
}
apiHeartbeat();

document.addEventListener('DOMContentLoaded', function () {
  setInterval(apiHeartbeat, 1000 * 15);
  $('apiHeartbeatCheckbox').addEventListener('change', function () {
    apiHeartbeat();
  });
  apiHeartbeat();
});




function updateUpscalerDropdown(models) {
  const modelDropdown = $('text2img_hr_upscaler');
  modelDropdown.innerHTML = '';
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model.name;
    option.textContent = model.name;

    if (basePrompt.text2img_hr_upscaler === model.name) {
      option.selected = true;
    }
    modelDropdown.appendChild(option);
  });
}

function updateSamplerDropdown(models) {
  const modelDropdown = $('basePrompt_samplingMethod');
  modelDropdown.innerHTML = '';
  basePrompt.text2img_samplingMethod

  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model.name;
    option.textContent = model.name;

    if (basePrompt.text2img_samplingMethod === model.name) {
      option.selected = true;
    }
    modelDropdown.appendChild(option);
  });
}

function updateModelDropdown(models) {
  const modelDropdown = $('basePrompt_model');
  modelDropdown.innerHTML = '';
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model.title;
    option.textContent = model.model_name;

    if (basePrompt.text2img_model === removeHashStr(model.title)) {
      option.selected = true;
    }
    modelDropdown.appendChild(option);
  });
}

//Before:ABC.safetensors [23e4fa2b6f]
//After :ABC.safetensors
function removeHashStr(str) {
  return str.replace(/\s*\[[^\]]+\]\s*$/, '');
}

$('basePrompt_model').addEventListener('change', function(event){
  if (API_mode == apis.A1111) {
    sendModelToServer();
  }else if( API_mode == apis.COMFYUI ){
    //TODO
  }

});
