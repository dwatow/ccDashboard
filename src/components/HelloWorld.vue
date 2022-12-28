<template>
  <div class="container">
    <span v-if="error">{{ error }}</span>
    <!-- <pre>{{ all_erp_status }}</pre> -->
    <button
      type="button"
      class="btn btn-primary my-2 me-2"
      @click="fetchStatus(null)"
    >
      全部重新整理
    </button>
    <nav>
      <ul class="nav nav-tabs erp_status">
        <li class="nav-item" v-for="(erp_status, key) in all_erp_status">
          <pre>erp_status: {{  erp_status  }}</pre>
          <!-- <pre>key: {{  key }}</pre> -->
          <a
            class="nav-link active erp-name"
            aria-current="page"
            @click="update(erp_status, key)"
          >
            {{ erp_status.name }}
            <button
            v-if="erp_status.isSync != null"
              type="button"
              class="btn btn-primary my-2 me-2 btn-sm"
              @click="fetchStatus(erp_status.repo)"
            >
              重新整理
            </button>
            <small
              class="badge rounded-pill bg-danger"
              v-if="erp_status.isSync === false"
            >
              待更新
            </small>
            <small
              class="badge rounded-pill bg-success"
              v-if="erp_status.isSync == null"
            >
              連線中
            </small>
          </a>
        </li>
      </ul>
    </nav>
    <div class="content" v-if="current_erp.isSync != null">
      <a
        class="btn btn-primary my-3"
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
import API from "./../utility/jenkinsAPI";
export default {
  name: "Hello World",
  created() {
    this.fetchStatus(null);
  },
  data() {
    return {
      all_erp_status: {
        ccerpF: {
          isSync: null,
          repo: "ccerp-frontend",
          name: "全強 ERP 前端 (AngularJS)"
        },
        ccerpFV: {
          isSync: null,
          repo: "ccerp-frontend-vue",
          name: "全強 ERP 前端 (Vue)"
        },
        ccerpB: {
          isSync: null,
          repo: "ccerp-backend",
          name: "全強 ERP 後端"
        },
        ccgeoF: {
          isSync: null,
          repo: "ccgeo-frontend",
          name: "大地監控 前端"
        },
        ccgeoB: {
          isSync: null,
          repo: "ccgeo-backend",
          name: "大地監控 後端"
        },
        jserpF: {
          isSync: null,
          repo: "frontend",
          name: "郡信 ERP 前端"
        },
        jserpB: {
          isSync: null,
          repo: "backend",
          name: "郡信 ERP 後端"
        },
        patronF: {
          isSync: null,
          repo: "frontend",
          name: "台灣守護 ERP 前端"
        },
        patronB: {
          isSync: null,
          repo: "backend",
          name: "台灣守護 ERP 後端"
        },
        prettyF: {
          isSync: null,
          repo: "frontend",
          name: "台灣真美 ERP 前端"
        },
        prettyB: {
          isSync: null,
          repo: "backend",
          name: "台灣真美 ERP 後端"
        },
        campF: {
          isSync: null,
          repo: "frontend",
          name: "露營樂 ERP 前端"
        },
        campB: {
          isSync: null,
          repo: "backend",
          name: "露營樂 ERP 後端"
        },
      },
      current_erp: {
        isSync: null,
      },
      error: null,
    };
  },
  methods: {
    fetchStatus(repo) {
      try {
        this.error = "連線中...";
        if (repo == null) {
          // this.all_erp_status = null;
          // this.current_erp = null;
          API.fetchUpdateStatus({
            job: "ccerp",
            repo: "ccerp-frontend",
          }).then((res) => {
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
          API.fetchUpdateStatus({
            job: "ccerp",
            repo,
          }).then((res) => {
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
    mounted() {
      this.$nextTick(() => {
        removeH2Link();
        removeNameLink();
      })
    },
    update(erp, key) {
      this.current_erp = {
        key, 
        ...erp
      };
    },
    removeH2Link() {
      document.querySelectorAll('content h2').forEach(h2 => {
        const a = h2.querySelector('a');
        const text = a.textContent
        h2.textContent = text
      })
    },
    removeNameLink() {
      document.querySelectorAll('content ol').forEach(h2 => {
        const a_name = h2.querySelector('a');
        const name = a_name.textContent;
        const a_name_list = [...h2.querySelectorAll('a')].filter(link => link.textContent === name);
        console.log('a', a_name_list)
        a_name_list.forEach(link => link.outerHTML = link.textContent)
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
