<template>
  <div class="container">
    
    <span v-if="error">{{ error }}</span>
    <!-- <pre>{{ all_erp_status }}</pre> -->
    <button
      type="button"
      class="btn btn-primary my-2 me-2"
      @click="fetchStatus(null)"
    >
      重新整理 <FontAwesomeIcon icon="fa-solid fa-rotate-right" />
    </button>
    <nav>
      <ul class="nav nav-tabs erp_status">
        <li class="nav-item" v-for="(erp_status, key) in all_erp_status" :key="key">
          <!-- <pre>erp_status.isSync: {{  erp_status.isSync  }}</pre> -->
          <!-- <pre>erp_status.network: {{  erp_status.network  }}</pre> -->
          <!-- <pre>key: {{  key }}</pre> -->
          <a
            class="nav-link active erp-name"
            aria-current="page"
            @click="update(erp_status, key)"
          >
            {{ erp_status.name }}
            <small
              class="badge rounded-pill bg-danger"
              v-if="erp_status.isSync === syncType['syncable']"
            >
              待更新
            </small>
            <button
              v-if="['init', 'error', 'syncable', 'success'].some(status => syncType[status] === erp_status.isSync)"
              type="button"
              class="btn btn-outline-secondary my-2 mx-1 btn-sm"
              @click.prevent="fetchStatus(key)"
            >
              <FontAwesomeIcon icon="fa-solid fa-rotate-right" />
            </button>
            <small
              class="badge rounded-pill bg-success"
              v-if="erp_status.isSync === syncType['connecting']"
            >
              連線中
            </small>
          </a>
        </li>
      </ul>
    </nav>
    <div class="content" v-if="['syncable', 'success', 'error'].some(status => syncType[status] === current_erp.isSync)">
      <a
        class="btn btn-outline-success my-3"
        target="_blank"
        :href="current_erp.network"
        >Github Network</a
      >
      <div class="row">
        <div class="col">
          <div>
            <h1>
              <span class="col-6">測試機</span>
            </h1>
            <p>
              <span class="col-7">
                最後更新:
                <a :href="current_erp.lastest_stage.link">{{
                  current_erp.lastest_stage.log
                }}</a>
              </span>
            </p>
            <div v-html="current_erp.lastest_stage.html"></div>
          </div>
        </div>
        <div class="col">
          <div>
            <h1>
              <span class="col-6">正式機</span>
            </h1>
            <p>
              <span class="col-7">
                最後更新:
                <a :href="current_erp.lastest_prod.link">{{
                  current_erp.lastest_prod.log
                }}</a>
              </span>
            </p>
            <div v-html="current_erp.lastest_prod.html"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>({{ current_erp?.name }} 資料載入中...)</div>
  </div>
</template>

<script>
import API from "../utility/jenkinsAPI";
import { syncType } from "../utility/enum";

export default {
  name: "CCDashboard",
  created() {
    // this.fetchStatus(null);
  },
  data() {
    return {
      all_erp_status: {
        ccerpF: {
          isSync: syncType['init'],
          job: "ccerp",
          repo: "ccerp-frontend",
          name: "全強 ERP 前端 (AngularJS)"
        },
        ccerpFV: {
          isSync: syncType['init'],
          job: "ccerp",
          repo: "ccerp-frontend-vue",
          name: "全強 ERP 前端 (Vue)"
        },
        ccerpB: {
          isSync: syncType['init'],
          job: "ccerp",
          repo: "ccerp-backend",
          name: "全強 ERP 後端"
        },
        ccgeoF: {
          isSync: syncType['init'],
          job: "ccgeo",
          repo: "ccgeo-frontend",
          name: "大地監控 前端"
        },
        ccgeoB: {
          isSync: syncType['init'],
          job: "ccgeo",
          repo: "ccgeo-backend",
          name: "大地監控 後端"
        },
        jserpF: {
          isSync: syncType['init'],
          job: "jserp",
          repo: "frontend",
          name: "郡信 ERP 前端"
        },
        jserpB: {
          isSync: syncType['init'],
          job: "jserp",
          repo: "backend",
          name: "郡信 ERP 後端"
        },
        patronF: {
          isSync: syncType['init'],
          job: "patron",
          repo: "frontend",
          name: "台灣守護 ERP 前端"
        },
        patronB: {
          isSync: syncType['init'],
          job: "patron",
          repo: "backend",
          name: "台灣守護 ERP 後端"
        },
        prettyF: {
          isSync: syncType['init'],
          job: "pretty",
          repo: "frontend",
          name: "台灣真美 ERP 前端"
        },
        prettyB: {
          isSync: syncType['init'],
          job: "pretty",
          repo: "backend",
          name: "台灣真美 ERP 後端"
        },
        campF: {
          isSync: syncType['init'],
          job: "easy-camp",
          repo: "frontend",
          name: "露營樂 ERP 前端"
        },
        campB: {
          isSync: syncType['init'],
          job: "easy-camp",
          repo: "backend",
          name: "露營樂 ERP 後端"
        },
      },
      current_erp: {
        isSync: syncType['init'],
      },
      error: null,
    };
  },
  updated() {
    this.$nextTick(() => {
      this.removeH2Link();
      this.removeNameLink();
    })
  },
  computed: {
    syncType: () => syncType
  },
  methods: {
    setSyncType(type) {
      Object.values(this.all_erp_status).forEach(erp_status => {
        erp_status.isSync = syncType[type]
      })
    },
    fetchStatus(key) {
      try {
        this.error = "連線中...";
        if (key == null) {
          this.setSyncType('connecting');
          // this.all_erp_status = null;
          // this.current_erp = null;
          API.fetchUpdateStatus({
            job: "ccerp",
            repo: "ccerp-frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              ccerpF: {
                ...this.all_erp_status.ccerpF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "ccerp",
            repo: "ccerp-frontend-vue",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              ccerpFV: {
                ...this.all_erp_status.ccerpFV,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "ccerp",
            repo: "ccerp-backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              ccerpB: {
                ...this.all_erp_status.ccerpB,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "ccgeo",
            repo: "ccgeo-frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              ccgeoF: {
                ...this.all_erp_status.ccgeoF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "ccgeo",
            repo: "ccgeo-backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              ccgeoB: {
                ...this.all_erp_status.ccgeoB,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "jserp",
            repo: "frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              jserpF: {
                ...this.all_erp_status.jserpF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "jserp",
            repo: "backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              jserpB: {
                ...this.all_erp_status.jserpB,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "patron",
            repo: "frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              patronF: {
                ...this.all_erp_status.patronF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "patron",
            repo: "backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              patronB: {
                ...this.all_erp_status.patronB,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "pretty",
            repo: "frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              prettyF: {
                ...this.all_erp_status.prettyF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "pretty",
            repo: "backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              prettyB: {
                ...this.all_erp_status.prettyB,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "easy-camp",
            repo: "frontend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              campF: {
                ...this.all_erp_status.campF,
                ...res
              },
            };
          });
          API.fetchUpdateStatus({
            job: "easy-camp",
            repo: "backend",
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              campB: {
                ...this.all_erp_status.campB,
                ...res
              },
            };
          });
          // update(ccerpF);
        } else {
          const erp = this.all_erp_status[key]
          const { job, repo } = erp;
          erp.isSync = syncType['connecting']
          console.log(erp, key);
          API.fetchUpdateStatus({
            job,
            repo,
          }).then((res) => {
            res.isSync = Number(res.isSync)
            this.all_erp_status = {
              ...this.all_erp_status,
              [key]: {
                ...this.all_erp_status[key],
                ...res
              },
            };
          });
        }
        this.error = null;
      } catch (e) {
        this.error = e;
      }
    },
    update(erp, key) {
      this.current_erp = {
        key, 
        ...erp
      };
    },
    removeH2Link() {
      document.querySelectorAll('.content h2').forEach(h2 => {
        const a = h2.querySelector('a');
        if (a != null) {
          const text = a.textContent
          h2.textContent = text
        }
      })
    },
    removeNameLink() {
      document.querySelectorAll('.content ol').forEach(h2 => {
        const a_name = h2.querySelector('a');
        if (a_name != null) {
          const name = a_name.textContent;
          const a_name_list = [...h2.querySelectorAll('a')].filter(link => link.textContent === name);
          a_name_list.forEach(link => link.outerHTML = link.textContent)
        }
      })
    },
  },
};
</script>

<style scoped>
.status {
  background-color: yellow;
}
</style>
